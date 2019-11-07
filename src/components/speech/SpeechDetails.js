import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import APIManager from '../modules/APIManager'
import EditSpeechModal from "./EditSpeechModal"
import { Modal, Button, Header, Icon, Message, Step } from 'semantic-ui-react'
import Highlighter from 'react-highlight-words'
import './SpeechDetails.css'
import './Chart.css'

const SpeechDetails = props => {

    const [singleSpeech, setSpeech] = useState({date: ""});
    const [open, setOpen] = useState()
    const [deleteOpen, setDeleteOpen] = useState()

    const timeDifference = props.convert(singleSpeech.set_time - singleSpeech.actual_time)

    console.log(singleSpeech.set_time - singleSpeech.actual_time)
    console.log(props.convert(singleSpeech.set_time - singleSpeech.actual_time))
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
                        <div className="button-div">
                        <Button
                            as={Link}
                            to="/speeches"
                            size="small"
                            color="purple"
                            icon="chevron left"
                            labelPosition="left"
                            content="View all speeches"
                            style={{float: 'right', display: 'block', marginLeft: 20, marginTop: 20, borderRadius: 0}}
                        />
                        </div>
                        <h3 className="speech-title">{singleSpeech.title}</h3>
                        <h4 className="speech-date" style={{marginBottom: 500}}>{convertDate(singleSpeech.date)}</h4>
                    </div>
                    <div className="header-buttons">
                        <Modal
                            trigger=
                                {<Button onClick={handleDeleteOpen}
                                size="small"
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
                    </div>
                    <div className="speech-report">
                        <div className='label-div'>
                            <h5 className='time-label'>Set time</h5>
                            <h5 className='time-label'>Actual time</h5>
                            <h5 className='time-label'>Difference</h5>
                        </div>
                        <div className="time">
                            <Message info compact>
                                {props.convert(singleSpeech.set_time)}
                            </Message>
                        </div>

                        <div className="time">
                            <Message info compact>
                                {props.convert(singleSpeech.actual_time)}
                            </Message>
                        </div>

                        <div className="time">
                            <Message className={`compact ${timeDifference < 0 ? 'negative': 'warning'}`}>
                                {timeDifference}
                            </Message>
                        </div>
                        <Message floating compact style={{width: 800, marginLeft: 30, marginTop: 40}}>
                            <Highlighter
                                // id="content"
                                highlightClassName="highlighted-words"
                                searchWords={["like", " so ", "okay", "you know"]}
                                autoEscape={true}
                                textToHighlight={singleSpeech.transcript}
                                highlightStyle={{backgroundColor: '#f8d129', color: 'white'}}
                            />
                        </Message>
                        <br/>
                        <div className="chart chart--dev">
                            <span className="chart__title">Filler Words</span>
                            <ul className="chart--horiz">
                                <strong className="chart__word">UM</strong>
                                <li className="chart__bar" style={{width: `${singleSpeech.um/.2}%`}}>
                                    <p className="chart__label">{singleSpeech.um}</p>
                                </li>
                                <strong className="chart__word">UH</strong>
                                <li className="chart__bar" style={{width: `${singleSpeech.uh/.2}%`}}>
                                    <span className="chart__label">{singleSpeech.uh}</span>
                                </li>
                                <strong className="chart__word">LIKE</strong>
                                <li className="chart__bar" style={{width: `${singleSpeech.like/.2}%`}}>
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