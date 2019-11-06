import React, { useRef, useEffect, useState } from "react"
import APIManager from "../modules/APIManager"
import { Button } from "semantic-ui-react"



const NewEventForm = props => {

  const name = useRef();

  const addNewEvent = e => {
    e.preventDefault();
    const newEventObject = {
      name: name.current.value,
    }
    APIManager.post("events", newEventObject).then(() => {
        props.addEvent()
    })
  };

  console.log(props)
  return (
    <React.Fragment>
        <div>
          <input style={{height: 45, fontSize: 16, marginBottom: 10}} type="text" name="name" ref={name} placeholder="Enter the name of the event" />
          <br />
          <Button size="tiny" onClick={e => addNewEvent(e)}>Add</Button>
          <Button size="tiny" onClick={() => props.closeForm()}>Close</Button>
        </div>

    </React.Fragment>
  );
};
export default NewEventForm;
