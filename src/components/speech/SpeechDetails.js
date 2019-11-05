import React, {useState, useEffect } from "react"
import APIManager from '../modules/APIManager'
import EditSpeechModal from "./EditSpeechModal";

const SpeechDetails = props => {

    const [singleSpeech, setSpeech] = useState([]);
    const [open, setOpen] = useState()

    const handleOpen = () => {
        setOpen(true)
        console.log('click')
    }

    const getSingleSpeech = () => {
        const id = props.match.params.speechId
        APIManager.getOne("speeches", id)
          .then(response => {
            setSpeech(response)
          })
    }

    const timeDifference = props.convert(singleSpeech.set_time - singleSpeech.actual_time)

    useEffect(() => {
        getSingleSpeech()
    }, [])

    // Only need to send the speech id to Django app. The rest of the process will be handled on the server side

console.log(props)
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
              </section>
            }
        </>
    )
}

export default SpeechDetails