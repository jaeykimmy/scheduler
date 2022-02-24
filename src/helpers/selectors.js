export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const foundDay = state.days.find((d) => d.name === day)
  if (!foundDay) {
    return []
  } 
  
  const result = foundDay.appointments.map((appointmentID) => state.appointments[appointmentID])
  return result
}