import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application() {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  
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
