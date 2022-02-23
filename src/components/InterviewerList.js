import React from "react"
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const propsInterviewers = props.interviewers
  console.log(propsInterviewers)
  
  const interviewers = propsInterviewers.map((propsInterviewers) =>
    <InterviewerListItem {...propsInterviewers}
      setInterviewer={props.setInterviewer}
      selected={propsInterviewers.id === props.interviewer}
      key={propsInterviewers.id} />)
  
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
    </ul>
    </section>
  )
}