import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
      day: "Monday",
      days: [],
    appointments: {},
  });
  
    function bookInterview(id, interview) {
      // console.log(id, interview);
      console.log(state.days)
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
      .then(() => updateSpots());
      // .then((res) => {
      //   console.log(res.data);
      //   const newState = { ...state };
      //   newState[interview.id] = interview;

      //   setState(newState);
      // })
      
    }
  
  function updateSpots() {
    axios.get('/api/days/')
      .then((res) => {
        setState((prev) => (
          {...prev, days: res.data}
      ))
    })
  }
    
    function cancelInterview(id) {
      console.log("cancel interview:", id)
      return axios.delete(`/api/appointments/${id}`, { interview: null })
      .then(() => updateSpots());
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
  return {state, setDay, bookInterview, cancelInterview}
}