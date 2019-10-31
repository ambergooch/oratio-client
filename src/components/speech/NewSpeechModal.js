import React, { useRef, useEffect, useState } from "react";
import { Button, Header, Image, Modal, Divider, TransitionablePortal, Form } from 'semantic-ui-react'
import APIManager from '../modules/APIManager'

const NewSpeechModal = props => {
    const title = useRef();
    const set_time = useRef();
    const events = useRef();

    const [fetchedEvents, setFetchedEvents] = useState([]);
    const [open, setOpen] = useState(true)
    const [closeOnEscape, setCloseOnEscape] = useState()
    const [closeOnDimmerClick, setCloseOnDimmerClick] = useState()

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    // function that adds a new speech to the database
    // this function is being called when you click the add to product button
    const addToSpeeches = e => {
        e.preventDefault()
        // object that grabs all the values for the new speech
        const newSpeechObject = {
            user_id: localStorage.getItem("user_id"),
            title: title.current.value,
            date: "",
            set_time: set_time.current.value,
            actual_time: "",
            transcript: "",
            events: events.current.value,
            um: "",
            uh: "",
            like: ""
        }
        // post request from API manager that connects create method on server side to post on client side
        APIManager.post("speeches", newSpeechObject).then(() => {
            props.history.push("/practice");
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
    <div>
        <style>{`
        .ui.dimmer {
            transition: background-color 0.5s ease;
            background-color: transparent;
        }

        .modal-fade-in .ui.dimmer {
            background-color: orange;
        }
        `}</style>

        <Button content='Open' onClick={handleOpen} />

        <TransitionablePortal
        open={open}
        onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
        transition={{ animation: 'scale', duration: 500 }}
        >
        <Modal
            open={open}
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            size='small'
            onClose={(event) => {
            document.body.classList.remove('modal-fade-in')
            handleClose()
            }}
        >
            <Modal.Header>Create a New Speech</Modal.Header>
            <Modal.Content>
            <Form size='large'>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" title="title" ref={title} placeholder="Title" />
                </div>
                <div>
                    <label htmlFor="set_time">Set a time limit</label>
                    <input type="time" step='1' min="00:00:00" max="00:90:00" name="set_time" ref={set_time} placeholder="Enter time" />
                </div>
                <div>
                    {/* <Form.Group widths='equal'>
                        <Form.Field label='An HTML <input>' control='input' />
                        <Form.Field size='large' label='Select an event' name='events' control='select'>
                            {fetchedEvents.map(event => {
                                return (
                                    <option
                                    key={event.id}
                                    id={event.id}
                                    value={event.id}
                                    >
                                    {event.name}
                                    </option>
                                );
                            })}
                        </Form.Field>
                    </Form.Group> */}
                    <label htmlFor="events">Select an Event</label>
                    <select type="text" name="events" ref={events}>
                        <option>Select an Event</option>
                        {fetchedEvents.map(event => {
                            return (
                                <option
                                key={event.id}
                                id={event.id}
                                value={event.id}
                                >
                                {event.name}
                                </option>
                                );
                        })}
                    </select>
                </div>
            </Form>
            {/* <Divider />
            <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
            <Divider />
            <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' />
            <Divider />
            <Image src='https://semantic-ui.com/images/wireframe/paragraph.png' /> */}
            </Modal.Content>
            <Modal.Actions>
                {/* <Button onClick={handleClose} negative>
                Close
                </Button> */}
                <Button
                onClick={e => addToSpeeches(e)}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Start'
                />
            </Modal.Actions>
        </Modal>
        </TransitionablePortal>
    </div>
    )
}

export default NewSpeechModal