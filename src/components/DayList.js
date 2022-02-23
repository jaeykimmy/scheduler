import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const propsDays = props.days
  console.log(propsDays)
  const days = propsDays.map((propsDays) =>
    <DayListItem {...propsDays}
      setDay={props.setDay}
      selected={propsDays.name === props.day}
      key={propsDays.id}/>)
  return (
    <ul>
       {days} 
    </ul>
  )
}