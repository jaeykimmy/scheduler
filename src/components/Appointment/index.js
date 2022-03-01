import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
  const interview = {
    student: name,
    interviewer
  };
    props.bookInterview(props.id, interview)
    // console.log(props.id, interview)
    .then(()=>transition(SHOW))
}
  function deleteInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
    transition(EMPTY)
  }
  function confirmDelete() {
    transition(CONFIRM)
  }
  
  return (
      <article className="appointment">
      < Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
        student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
      />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back}/>
      )}
      {mode === SAVING && (
        <Status message={"Saving..."}/>
      )}
      {mode === DELETING && (
        <Status message={"Deleting..."}/>
      )}
      {mode === CONFIRM && (
        <Confirm message={"Are you sure?"} onCancel={back} onConfirm={() => deleteInterview(props.id)}/>
      )}
      
      </article>
  )
}