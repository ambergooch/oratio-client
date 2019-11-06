import React, { useRef, useEffect, useState } from "react";
import { Button, Header, Image, Modal, Divider, Transition, Form, Container } from 'semantic-ui-react'
import TimeField from 'react-simple-timefield'
// import 'rc-time-picker/assets/index.css';
import APIManager from '../modules/APIManager'
import EventSelector from '../event/EventSelector'

const NewSpeechModal = props => {
    const title = useRef()
    const set_time = useRef()
    const childRef = useRef({})

    const [closeOnEscape, setCloseOnEscape] = useState()
    const [closeOnDimmerClick, setCloseOnDimmerClick] = useState()
    const [time, setTime] = useState('')
    const [speech, setSpeech] = useState({})

    const handleOpen = () => {
        props.setOpen(true)
        console.log('click')
    }

    const handleClose = () => {
        props.setOpen(false)
    }

    const handleFieldChange = evt => {
        console.log(evt)
        // const stateToChange = '';
        // stateToChange[evt.target.id] = evt.target.value;
        setTime(evt.target.value);
      };

    const handleClick = (e) => {
        e.preventDefault()
        createNewSpeech()
        // addSpeechToEvent()
        handleClose()
    }

    const convertToMilliseconds = (time) => {
        const timeParts = time.split(":")
        return ((parseInt(timeParts[0]*3600) + parseInt(timeParts[1]*60) + parseInt(timeParts[2])) * 1000)
    }

    // function that adds a new speech to the database
    // this function is being called when you click the start button
    const createNewSpeech = e => {

        // object that grabs all the values for the new speech
        const newSpeechObject = {
            title: title.current.value,
            date: "",
            prompt: props.selectedPrompt,
            set_time: convertToMilliseconds(set_time.current.state.value)
        }
        // post request from API manager that connects create method on server side to post on client side
        APIManager.post("speeches", newSpeechObject)
        .then((newSpeech) => newSpeech.json())
        .then(newSpeech => {
          console.log("created speech", newSpeech)
          addSpeechToEvent(newSpeech)
          setSpeech(newSpeech)
        })
    }

    const addSpeechToEvent = (speech) => {

      const eventObject = {
          name: childRef.current.state.value,
          speech_id: speech.id
      }

      APIManager.post("events", eventObject)
      .then(() => {
          console.log("speech added to event")
          props.setReady(true)
      })
    }

    useEffect(() => {
        setCloseOnDimmerClick(false)
        setCloseOnEscape(false)
    }, []);

    console.log(childRef.current)
    return (
        <>
        <style>
        {`
            .ui.dimmer {
                transition: background-color 0.5s ease;
                background-color: transparent;
            }

            .ui.dimmer {
                background-color: purple;
            }
        `}
        </style>
        <Button content='Open' onClick={handleOpen} />

        <Transition.Group
            animation='scale'
            duration={500}
        >
        {props.open && (
        <Modal
            open={props.open}
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
                <Form>
                    <Container style={{marginBottom: 20}}>
                        <input style={{height: 45, fontSize: 16}} type="text" name="title" ref={title} placeholder="Enter a Title" />
                    </Container>
                    <div style={{marginBottom: 20}}>
                        <label htmlFor="set_time">Set a time limit</label>
                        <br></br>
                        <TimeField  style={{ width: '150px', fontSize: '18px' }}
                            ref={set_time}
                            name='set_time'
                            value={time}
                            onChange={(e, value) => handleFieldChange(e, value)}
                            showSeconds />
                    </div>
                    <br />
                    <EventSelector {...props} getRef={childRef}/>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                onClick={handleClick}
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