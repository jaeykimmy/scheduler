import React from "react";
import "components/Appointment/styles.scss"

export default function Application(props) {
  console.log(props)
  return (
    <article className="appointment">
      {!props.time && <>No Appointment</>}
      {props.time && <>Appointment at {props.time}</>}
    </article>
  )
}