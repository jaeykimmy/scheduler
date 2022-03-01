import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const propsDays = props.days
  // for (let i in propsDays) {
  //   console.log("spots:", propsDays[i].spots)
  // }
   console.log(propsDays)
  const days = propsDays.map((propsDays) =>
    <DayListItem {...propsDays}
      setDay={props.onChange}
      selected={propsDays.name === props.value}
      key={propsDays.id}/>)
  return (
    <ul>
       {days} 
    </ul>
  )
}