import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import APIManager from "../modules/APIManager";
import EventForm from "./EventForm"

const EventSelector = props => {

    const [eventList, setEventList] = useState([])
    const [show, setShow] = useState(false)

    const event = useRef();
    const name = useRef()

    const addEvent = () => {
        setShow(!show)
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
                <strong>Select an an event</strong>
                <br />
                {show ? <EventForm addEvent={addEvent} /> :
                <div>

                    <select
                        type="event"
                        name="event"
                        ref={props.getRef}
                    >
                        {eventList.map(event => {
                        return (
                            <option key={event.id} value={event.name}>
                            {event.name}
                            </option>
                            )
                        })}
                    </select>
                    <button onClick={addEvent}>Add a new event</button>

                </div>
                }
                {/* <button onClick={handleClick}>Place order</button> */}
                <br />
            </div>
        </>
    );
};

export default EventSelector;