import React, { useState, useEffect, useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import APIManager from "../modules/APIManager"
import { Button, Header, Image, Modal, Divider, Transition, Form, TextArea } from 'semantic-ui-react'
import EventSelector from '../event/EventSelector'


const EditSpeechForm = props => {
  const transcript = useRef();
  const actual_time = useRef();
  const um = useRef();
  const uh = useRef();
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
      um: um.current.value,
      uh: uh.current.value,
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

  console.log(um)
  console.log(speech)
  return (
    <>
      {/* {open && ( */}
      <div>
        <Modal

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
              <p>${speech.date}</p>
              <Form>
                <TextArea ref={transcript}
                  size="large"
                  type="text"
                  name="transcript"
                  defaultValue={speech.transcript} />
              </Form>
              <EventSelector {...props} getRef={childRef} />
              <div >
                <input type="hidden" ref={actual_time} value={speech.actual_time}></input>
                <input type="hidden" ref={um} value={speech.um}></input>
                <input type="hidden" ref={uh} value={speech.uh}></input>
                <input type="hidden" ref={like} value={speech.like}></input>
              </div>
            </Modal.Content>
            <Modal.Actions>
                {/* <Button onClick={handleClose} negative>
                Close
                </Button> */}
                <Button
                onClick={updateSpeech}
                positive
                content='Submit'
                />
            </Modal.Actions>
        </Modal>

        </div>
      {/* )} */}
    </>
  );
};

export default EditSpeechForm;
