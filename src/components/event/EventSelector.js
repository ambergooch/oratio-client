import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import APIManager from "../modules/APIManager";
import EventForm from "./EventForm"
import { Dropdown } from "semantic-ui-react"
const EventSelector = props => {

    const [eventList, setEventList] = useState([])
    const [show, setShow] = useState(false)

    const event = useRef();
    const name = useRef()

    const addEvent = () => {
        setShow(!show)
    }

    const closeForm = () => {
        setShow(false)
    }

    // const addSpeechToEvent = (id) => {

    //     const eventObject = {
    //         name: name.current.value,
    //         speech_id: speech.current.id
    //     }

    //     APIManager.put("events", eventObject, id)
    //     .then(() => {
    //         console.log("speech added to event")
    //     })
    // }

    const getEvents = () => {
       APIManager.get("events")
        .then(setEventList)
    }



    useEffect(() => {
        getEvents()
    }, [show]);

    return (
        <>
            <div>
                {show ? <EventForm addEvent={addEvent} closeForm={closeForm} /> :
            <div>
                    {/* <div role="listbox" aria-expanded="false" className="ui selection dropdown" tabIndex="0">
  <div className="default text" role="alert" aria-live="polite" aria-atomic="true">
    Select your country
  </div>
  <i aria-hidden="true" className="dropdown icon"></i>
  <div className="menu transition">
    <div
    //   style="pointer-events:all"
      role="option"
      aria-checked="false"
      aria-selected="true"
      className="selected item"
      name="event"
      ref={props.getRef}
    >
      {eventList.map(event => {
          return (
          <span className="text">
                            <option key={event.id} value={event.name}>
                            {event.name}
                            </option>
      </span>
                            )
                        })}
    </div>
  </div>
</div> */}
                    <Dropdown
                        selection
                        placeholder="Select an event"
                        ref={props.getRef}
                        style={{height: 45, fontSize: 14}}
                        options={
                            eventList.map(event => {
                                return (
                                    {key: event.id, value: event.name,
                                    text: event.name}

                                    )
                                })
                        }
                    />
                    {/* <select
                        type="text"
                        name="event"
                        ref={props.getRef}
                        style={{height: 20}}
                    >
                        {eventList.map(event => {
                        return (
                            <option key={event.id} value={event.name}>
                            {event.name}
                            </option>
                            )
                        })}
                    </select> */}
                    <br /><br />
                    <strong>Don't see your event listed? </strong>
                    <br />
                    <Link to="#" onClick={addEvent}>Add a new event</Link>

                </div>
                }
                {/* <button onClick={handleClick}>Place order</button> */}
                <br />
            </div>
        </>
    );
};

export default EventSelector;