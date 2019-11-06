import React, {useState, useEffect } from "react"
import APIManager from '../modules/APIManager'
import EditSpeechModal from "./EditSpeechModal"
import { Modal, Button, Header, Icon } from 'semantic-ui-react'


const SpeechDetails = props => {

    const [singleSpeech, setSpeech] = useState([]);
    const [open, setOpen] = useState()
    const [deleteOpen, setDeleteOpen] = useState()

    const timeDifference = props.convert(singleSpeech.set_time - singleSpeech.actual_time)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteOpen = () => {
        setDeleteOpen(!deleteOpen)
    }

    const getSingleSpeech = () => {
        const id = props.match.params.speechId
        APIManager.getOne("speeches", id)
          .then(response => {
            setSpeech(response)
          })
    }

    const deleteSpeech = (id) => {
        APIManager.delete("speeches", id)
        .then(() => {
          props.history.push("/speeches")
        })
    }

    useEffect(() => {
        getSingleSpeech()
    }, [])

    // Only need to send the speech id to Django app. The rest of the process will be handled on the server side

console.log(props.id)
console.log(deleteOpen)
    return (
        <>
            {
              <section className="speech-details">
                  <h3>{singleSpeech.title}</h3>
                  <p>date: {singleSpeech.date}</p>
                  <p>set time{props.convert(singleSpeech.set_time)}</p>
                  <p>actual time:{props.convert(singleSpeech.actual_time)}</p>
                  <p>transcript:{singleSpeech.transcript}</p>
                  <p>difference: {timeDifference}</p>
                  <p>Um: {singleSpeech.um}</p>
                  <p>Uh: {singleSpeech.uh}</p>
                  <p>Like: {singleSpeech.like}</p>
                  <br/>
                  <button onClick={handleOpen}>Edit</button>
                  <EditSpeechModal {...props} open={open} />
                  <Modal
                    trigger={<Button onClick={handleDeleteOpen}
                                size="tiny"
                                style={{marginBottom: '30px', borderRadius: 0}}
                                negative>
                                    Delete
                            </Button>}
                    open={deleteOpen}
                    onClose={handleDeleteOpen}
                    basic
                    size='tiny'>
                        <Header icon='exclamation circle' content='Delete this speech' />
                        <Modal.Content>
                            <p>Are you sure you want to permanently delete this speech?</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button basic color='red' onClick={handleDeleteOpen} inverted >
                                <Icon name='remove' /> No
                            </Button>
                            <Button color='green' onClick={() => {deleteSpeech(); handleDeleteOpen()}} inverted>
                                <Icon name='checkmark' /> Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>


              </section>
            }
        </>
    )
}

export default SpeechDetails