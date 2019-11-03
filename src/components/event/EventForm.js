import React, { useRef, useEffect, useState } from "react";
import APIManager from "../modules/APIManager";


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
          <label htmlFor="name">Name</label>
          <input type="text" name="name" ref={name} placeholder="Name" />
        </div>

        <button onClick={e => addNewEvent(e)}>Add</button>
    </React.Fragment>
  );
};
export default NewEventForm;
