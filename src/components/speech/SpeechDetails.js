import React, {useState, useEffect } from 'react'
import APIManager from '../modules/APIManager'
import EditSpeechModal from "./EditSpeechModal"
import { Modal, Button, Header, Icon, Message, Step } from 'semantic-ui-react'
import './SpeechDetails.css'
import './Chart.css'

const SpeechDetails = props => {

    const [singleSpeech, setSpeech] = useState({date: ""});
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

    const convertDate = () => {
        const parts = singleSpeech.date.split(/[- : T]/);
        return `${parts[1]}/${parts[2]}/${parts[0]}`
    }

    useEffect(() => {
        getSingleSpeech()
    }, [])

    return (
        <>
            {
                <section className="speech-details">
                    <div className="speech-header">
                        <h3 className="speech-title">{singleSpeech.title}</h3>
                        <h4 className="speech-date" style={{marginBottom: 500}}>{convertDate(singleSpeech.date)}</h4>
                    </div>
                    <div className="speech-report">
                        <Modal
                            trigger=
                                {<Button onClick={handleDeleteOpen}
                                size="large"
                                style={{marginBottom: 30, borderRadius: 0, float: 'right', marginRight: 20}}
                                negative>
                                Delete
                                </Button>}
                            open={deleteOpen}
                            onClose={handleDeleteOpen}
                            basic
                            size='tiny'>
                            <Header size='large' icon='exclamation circle' content='Delete this speech' />
                            <Modal.Content size='large'>
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
                        <p className="time">
                            Set time
                            <Message info compact>
                                {props.convert(singleSpeech.set_time)}
                            </Message>
                        </p>
                        <p className="time">
                            Actual time
                            <Message info compact>
                                {props.convert(singleSpeech.actual_time)}
                            </Message>
                        </p>
                        <p className="time">difference: {timeDifference}</p>
                        <Message floating compact style={{width: 800, marginLeft: 30, marginTop: 40}}>{singleSpeech.transcript}</Message>
                        <br/>
                        <div className="chart chart--dev">
                            <span className="chart__title">Filler Words</span>
                            <ul className="chart--horiz">
                                <strong className="chart__word">UM</strong>
                                <li className="chart__bar" style={{width: `${singleSpeech.um/.1}%`}}>
                                    <span className="chart__label">{singleSpeech.um}</span>
                                </li>
                                <strong className="chart__word">UH</strong>
                                <li className="chart__bar" style={{width: `${singleSpeech.uh/.1}%`}}>
                                    <span className="chart__label">{singleSpeech.uh}</span>
                                </li>
                                <strong className="chart__word">LIKE</strong>
                                <li className="chart__bar" style={{width: `${singleSpeech.like/.1}%`}}>
                                    <span className="chart__label">{singleSpeech.like}</span>
                                </li>
                            </ul>
                        </div>
                        <EditSpeechModal {...props} open={open} setOpen={setOpen} />

                        <Button
                            onClick={handleOpen}
                            size="tiny"
                            color="purple"
                            style={{float: 'left', marginRight: '30px', marginBottom: '30px', borderRadius: 0}}
                        >
                            Edit
                        </Button>
                    </div>

              </section>
            }
        </>
    )
}

export default SpeechDetails