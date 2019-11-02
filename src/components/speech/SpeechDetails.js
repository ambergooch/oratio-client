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
                  <p>${singleSpeech.set_time}</p>
                  {/* <p>{singleSpeech.description}</p>
                  <p>Quantity: {singleProduct.quantity - singleProduct.total_sold}</p>
                  <p>Average Rating: {singleProduct.average_rating}</p> */}
                  <br/>
                  <button onClick = {addToEvent}>Add Order</button>
              </section>
            }
        </>
    )
}

export default SpeechDetails