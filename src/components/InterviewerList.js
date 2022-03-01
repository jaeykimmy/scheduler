import React from "react"
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss"
import { PropTypes } from "prop-types"

export default function InterviewerList(props) {
  // const propsInterviewers = props.interviewers
  // console.log(propsInterviewers)
  
  const interviewers = props.interviewers.map((propsInterviewers) =>
    <InterviewerListItem {...propsInterviewers}
      setInterviewer={() => props.onChange(propsInterviewers.id)}
      selected={propsInterviewers.id === props.value}
      key={propsInterviewers.id}
      onChange={()=>props.setStudent(props.name)}/>)
  
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
    </ul>
    </section>
  )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};