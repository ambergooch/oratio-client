import React, { useEffect, useState, useRef } from "react";
import APIManager from "../modules/APIManager";

const SpeechHistory = props => {

  const [allSpeeches, setSpeeches] = useState([])

  const getMySpeeches = () => {
    APIManager.get("speeches")
    .then(setSpeeches)
  }

  useEffect(getMySpeeches, [])

  return (
      <>
        <div className="speech-items">
            <h2>Speech History</h2>
                {
                    allSpeeches.filter((speech) => {
                        return speech.actual_time !== null})
                    .map(speech => {
                        return (
                            <div key={speech.id}>
                                <a href={`/speeches/${speech.id}`}><h5>{speech.name}</h5></a>
                            </div>
                        )
                    })
                }
        </div>
    </>
  )
}

export default SpeechHistory