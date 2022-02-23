import React from "react";
import 'components/InterviewerListItem.scss'
import classNames from "classnames";

export default function DayList(props) {
  console.log(props)
  const interviewerListItemClass = classNames('interviewers__item', {
    "interviewers__item--selected": props.selected
  })
  return (
    <li className={interviewerListItemClass} onClick ={()=> props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  {props.selected === true && <li>Sylvia Palmer</li>}
</li>
  )
}