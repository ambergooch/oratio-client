import React, { useEffect, useState, useRef } from "react";
import { Checkbox } from 'semantic-ui-react'
import APIManager from "../modules/APIManager";
import SpeechDetails from "./SpeechDetails"

const SpeechHistory = props => {

  const [allSpeeches, setSpeeches] = useState([])
  const [completedSpeeches, setCompletedSpeeches] = useState([])
  const [populatedEvents, setPopulatedEvents] = useState([])
  const [byEvent, setByEvent] = useState(false)

  const handleToggle = () => {
    setByEvent(!byEvent)
  }

  const getSpeeches = () => {
    APIManager.get("speeches")
    .then(setSpeeches)
  }

  const getCompletedSpeeches = () => {
    fetch('http://localhost:8000/speeches?complete=true', {
        "method": "GET",
        "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("oratio_token")}`
        }
    })
    .then(response => response.json())
    .then((response) => {
        setCompletedSpeeches(response)
    })
  }

  const getEventsWithSpeeches = () => {
    fetch('http://localhost:8000/events?withspeeches=true', {
        "method": "GET",
        "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("oratio_token")}`
        }
    })
    .then(response => response.json())
    .then((response) => {
        setPopulatedEvents(response)
    })
  }

  useEffect(() => {
    getSpeeches()
    getCompletedSpeeches()
    getEventsWithSpeeches()
  }, [])

  console.log(props)
  return (
      <>
        <div className="speech-items">
            <h2>Speech History</h2>
            <Checkbox toggle label='View by event' onChange={handleToggle}/>
              {!byEvent ?
                <div>
                {completedSpeeches.map(speech => {
                  return (
                      <div key={speech.id}>
                          <a href={`/speeches/${speech.id}`}><h5>{speech.title}</h5></a>
                      </div>
                  )
                  })
                }
                </div>
              :
                <div>
                {populatedEvents.map(event => {
                  return (
                    <div key={event.id}>
                      <h5>{event.name}</h5>
                      {event.speeches.filter(speech => {
                        return speech.actual_time !== null
                      })
                      .map(speech => {
                        return (
                          <SpeechDetails {...props} key={speech.id} id={speech.id} convert={props.convert} />
                        )
                      })}
                    </div>
                  )
                })}
                </div>
              }
        </div>
    </>
  )
}

export default SpeechHistory