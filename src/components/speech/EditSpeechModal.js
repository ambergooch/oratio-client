import React, { useState, useEffect, useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import APIManager from "../modules/APIManager"
import { Button, Header, Image, Modal, Divider, Transition, Form } from 'semantic-ui-react'
import EventSelector from '../event/EventSelector'


const EditSpeechForm = props => {
  const transcript = useRef();
  const actual_time = useRef();
  const um = useRef();
  const uh = useRef();
  const like = useRef();

  const [speech, setSpeech] = useState([]);
  const { isAuthenticated } = useSimpleAuth();
  const [open, setOpen] = useState()

  const speechId = props.match.params.speechId

  const handleOpen = () => {
    setOpen(true)
    console.log('click')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const getSpeech = () => {
    if (isAuthenticated()) {
      APIManager.getOne("speeches", speechId)
      .then(setSpeech)
    }
  }

  const updateSpeech = () => {
    const updatedSpeechObject = {
      transcript: transcript.current.value,
      actual_time: actual_time.current.value,
      um: um.current.value,
      uh: uh.current.value,
      like: like.current.value
    }
    APIManager.put("speeches", updatedSpeechObject, speechId)
      .then(() => {
      props.history.push(`/speeches/${speechId}`)
    })
  };

  const addToEvent = () => {
    const speechIdObject = {speech_id: speech.id}
    APIManager.post("events", speechIdObject)
}

  useEffect(() => {
    getSpeech();
  }, []);

  return (
    <>
      {/* {open && ( */}
      <div>
        <Modal
            open={props.open}
            size='small'
            onClose={(event) => {
                handleClose()
            }}>
            <Modal.Header>Edit Speech</Modal.Header>
            <Modal.Content>

                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" placeholder="Title" />
                    </div>

                    <EventSelector {...props} />
                    <div key={speech.id} className="card">

                        <p>{speech.title}</p>
                        <p>${speech.date}</p>
                        <textarea ref={transcript}
                          type="text"
                          name="transcript"
                          defaultValue={speech.transcript} />
                        <br />
                        <input type="hidden" ref={actual_time} defaultValue={speech.actual_time}></input>
                        <input type="hidden" ref={um} defaultValue={speech.um}></input>
                        <input type="hidden" ref={uh} defaultValue={speech.uh}></input>
                        <input type="hidden" ref={like} defaultValue={speech.like}></input>
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
