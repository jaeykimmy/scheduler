import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];

export default function Application() {
  // console.log(appointments1)
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
  ...state.appointments[id],
  interview: { ...interview }
    };
    const appointments = {
  ...state.appointments,
  [id]: appointment
    };
    setState({
  ...state,
      appointments
    });
    return axios.put(`/api/appointments/${id}`, { interview })
  }
  
  function cancelInterview(id) {
    console.log("cancel interview:", id)
    return axios.delete(`/api/appointments/${id}`, {interview: null})
  }
  

  
  const setDay = (day) => setState({ ...state, day });
  //   const setDays = (days) => {
  //     setState(prev => ({ ...prev, days }));
  // }
  
  
  useEffect(() => {
    // axios.get('/api/days').then(response => {
    // setDays(response.data)
    // console.log(response.data)
    
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log(all[0].data)
      // console.log(all[1].data)
      // console.log(all[2].data)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);
  // console.log(state.interviewers)
  const dailyAppointments = getAppointmentsForDay(state, state.day, state.interviewers);
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
    />)
})
  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" >
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" bookInterview={bookInterview}/>
      </section>
    </main>
  );
}
