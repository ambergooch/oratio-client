import React, { useEffect, useState, useRef } from "react";
import APIManager from "../modules/APIManager";

const SpeechHistory = props => {

  const [allSpeeches, setSpeeches] = useState([])

  const getMySpeeches = () => {
    APIManager.get("speeches")
    .then(setSpeeches)
  }

  const deleteSpeech = (id) => {
    APIManager.delete("speeches", id).then(() => {
      APIManager.get("speeches")
          .then((response) => {
              setSpeeches(response)
          })
    })
  }

  useEffect(getMySpeeches, [])

  console.log(allSpeeches)
  return (
      <>
        <div className="speech-items">
            <h2>Speech History</h2>
                {
                    allSpeeches.filter((speech) => {
                        return speech.actual_time})
                    .map(speech => {
                        console.log(speech)
                        return (
                            <div key={speech.id}>
                                <a href={`/speeches/${speech.id}`}><h5>{speech.title}</h5></a>
                                <button onClick={() => {deleteSpeech(speech.id)}}>Delete</button>
                            </div>
                        )
                    })
                }
        </div>
    </>
  )
}

export default SpeechHistory