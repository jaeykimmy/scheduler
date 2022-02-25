export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const foundDay = state.days.find((d) => d.name === day)
  if (!foundDay) {
    return []
  } 
  
  const result = foundDay.appointments.map((appointmentID) => state.appointments[appointmentID])
  return result
}
export function getInterview(state, interview) {
  const result = {}
  if (interview === null) return null;
  console.log(interview)
  
  if (interview.interviewer) {
    console.log(interview.student)
    result.interviewer = state.interviewers[interview.interviewer];
    result.student = interview.student;
    return result;
  }
}