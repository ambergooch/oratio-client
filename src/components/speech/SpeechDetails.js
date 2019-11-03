import React, {useState, useEffect } from "react"
import APIManager from '../modules/APIManager'

const SpeechDetails = props => {

    const [singleSpeech, setSpeech] = useState([]);

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
    const addToEvent = () => {
        const speechIdObject = {speech_id: singleSpeech.id}
        APIManager.post("events", speechIdObject)
    }
console.log(props)
    return (
        <>
            {
              <section className="speech-details">
                  <h3>{singleSpeech.title}</h3>
                  <p>set time{props.convert(singleSpeech.set_time)}</p>
                  <p>actual time:{props.convert(singleSpeech.actual_time)}</p>
                  <p>transcript:{singleSpeech.transcript}</p>
                  <p>difference: {timeDifference}</p>
                  <p>Um: {singleSpeech.um}</p>
                  <p>Uh: {singleSpeech.uh}</p>
                  <p>Like: {singleSpeech.like}</p>
                  <br/>
                  <button onClick = {addToEvent}>Add Order</button>
              </section>
            }
        </>
    )
}

export default SpeechDetails