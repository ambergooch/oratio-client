import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import APIManager from "../modules/APIManager";
import EventForm from "./EventForm"
import { Dropdown } from "semantic-ui-react"
const EventSelector = props => {

    const [eventList, setEventList] = useState([])
    const [show, setShow] = useState(false)

    const addEvent = () => {
        setShow(!show)
    }

    const closeForm = () => {
        setShow(false)
    }

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
                    <br /><br />
                    <strong>Don't see your event listed? </strong>
                    <br />
                    <Link to="#" onClick={addEvent}>Add a new event</Link>
                </div>
                }
                <br />
            </div>
        </>
    )
}

export default EventSelector;