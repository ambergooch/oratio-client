import React, { useState, useEffect, useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import APIManager from "../modules/APIManager"
import { Button, Header, Image, Modal, Divider, Transition, Form, TextArea } from 'semantic-ui-react'
import EventSelector from '../event/EventSelector'


const EditSpeechForm = props => {
  const transcript = useRef();
  const actual_time = useRef();
  const well = useRef();
  const so = useRef();
  const like = useRef();
  const childRef = useRef({})

  const [speech, setSpeech] = useState([]);
  const { isAuthenticated } = useSimpleAuth();
  const [open, setOpen] = useState()

  const speechId = props.match.params.speechId

  const handleOpen = () => {
    setOpen(true)
    console.log('click')
  }

  const handleClose = () => {
    props.setOpen(false)
  }

  const getSpeech = () => {
    if (isAuthenticated()) {
      APIManager.getOne("speeches", speechId)
      .then(setSpeech)
    }
  }

  const updateSpeech = () => {
    const updatedSpeechObject = {
      transcript: transcript.current.ref.current.value,
      actual_time: actual_time.current.value,
      well: well.current.value,
      so: so.current.value,
      like: like.current.value
    }
    APIManager.put("speeches", updatedSpeechObject, speechId)
      .then(() => {
        console.log(speech)
        addToEvent(speech)
        window.location = `/speeches/${speechId}`
      })
  };

  const addToEvent = (speech) => {
    const speechIdObject = {
      name: childRef.current.state.value,
      speech_id: speech.id
    }
    APIManager.post("events", speechIdObject)
}

  useEffect(() => {
    getSpeech();
  }, []);

  return (
    <>
      <style>
      {`
          .ui.dimmer {
              transition: background-color 0.5s ease;
              background-color: transparent;
          }

          .edit-modal .ui.dimmer {
              background-color: purple;
          }
      `}
      </style>
      <div>
        <Modal
            className="edit-modal"
            closeIcon
            open={open}
            open={props.open}
            size='small'
            onClose={(event) => {
                handleClose()
            }}>
            <Modal.Header>Edit Speech</Modal.Header>
            <Modal.Content>
              <h3>{speech.title}</h3>
              <Form>
                <TextArea ref={transcript}
                  type="text"
                  name="transcript"
                  rows='8'
                  defaultValue={speech.transcript} />
              </Form>
              <br />
              <EventSelector {...props} getRef={childRef} />
              <div >
                <input type="hidden" ref={actual_time} value={speech.actual_time}></input>
                <input type="hidden" ref={well} value={speech.well}></input>
                <input type="hidden" ref={so} value={speech.so}></input>
                <input type="hidden" ref={like} value={speech.like}></input>
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button
              onClick={updateSpeech}
              positive
              content='Submit'
              />
            </Modal.Actions>
        </Modal>
      </div>
    </>
  );
};

export default EditSpeechForm;
