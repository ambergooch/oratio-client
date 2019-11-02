import React, { useRef, useEffect, useState } from "react";
import { Button, Header, Image, Modal, Divider, Transition, Form } from 'semantic-ui-react'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css';
import APIManager from '../modules/APIManager'

const NewSpeechModal = props => {
    const title = useRef();
    const set_time = useRef();
    const events = useRef();

    const [fetchedEvents, setFetchedEvents] = useState([]);
    const [open, setOpen] = useState()
    const [closeOnEscape, setCloseOnEscape] = useState()
    const [closeOnDimmerClick, setCloseOnDimmerClick] = useState()
    const [setTime, setSetTime] = useState()

    const handleOpen = () => {
        setOpen(true)
        console.log('click')
    }

    const handleClose = () => {
      setOpen(false)
    }

    const handleFieldChange = evt => {
        console.log(evt)
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        setTime(stateToChange);
      };

    const handleInput = (input) => {
        console.log(input)
        setSetTime(input)
      }

    // function that adds a new speech to the database
    // this function is being called when you click the add to product button
    const addToSpeeches = e => {
        e.preventDefault()
        // object that grabs all the values for the new speech
        const newSpeechObject = {
            title: title.current.value,
            date: "",
            set_time: set_time.current.value,
            actual_time: null,
            transcript: "",
            events: events.current.value,
            um: null,
            uh: null,
            like: null
        }
        // post request from API manager that connects create method on server side to post on client side
        APIManager.post("speeches", newSpeechObject).then(() => {
            props.history.push("/");
          });
    }
  // function gets all events for dropdown
  const getEvents = () => {
    fetch(`http://localhost:8000/events`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        setFetchedEvents(response);
      });
  };

  useEffect(() => {
    getEvents();
    setCloseOnDimmerClick(false)
    setCloseOnEscape(false)
  }, []);

    return (
        <>
        <style>{`
          .ui.dimmer {
            transition: background-color 0.5s ease;
            background-color: transparent;
          }

           .ui.dimmer {
            background-color: orange;
          }
        `}</style>
        <Button content='Open' onClick={handleOpen} />

        <Transition.Group
            animation='scale'
            duration={500}
        >
        {open && (
        <Modal
            open={open}
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            size='small'
            onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}

            onClose={(event) => {
                document.body.classList.remove('modal-fade-in')
                handleClose()
            }}>
            <Modal.Header>Create a New Speech</Modal.Header>
            <Modal.Content>
                <form>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" ref={title} placeholder="Title" />
                    </div>
                    <div>
                        <label htmlFor="set_time">Set a time limit</label>
                        <input type="text" name="set_time" id="set_time" ref={set_time} placeholder="Enter time" required />
                        {/* <input type="time" value="mm:ss" min="0:00" max="0:00:3600" name="set_time" id="set_time" ref={set_time} placeholder="Enter time" required /> */}
                        {/* <TimePicker value={setTime} popupStyle={{ fontSize: '30px' }}
                            showHour={false}
                            secondStep={15}
                            clearText='clear'
                            onChange={(e) => handleInput(e)}/> */}
                    </div>
                    <div>
                        <label htmlFor="events">Select an Event</label>
                        <select type="text" name="events" ref={events}>
                            <option>Select an Event</option>
                            {fetchedEvents.map(event => {
                                return (
                                    <option key={event.id} id={event.id} value={event.id}>
                                        {event.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </form>
            </Modal.Content>
            <Modal.Actions>
                {/* <Button onClick={handleClose} negative>
                Close
                </Button> */}
                <Button
                onClick={e => addToSpeeches(e)}
                positive
                content='Start'
                />
            </Modal.Actions>
        </Modal>
        )}
        </Transition.Group>

    </>
    )
}

export default NewSpeechModal