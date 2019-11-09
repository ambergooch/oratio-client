import React, { useEffect, useState } from "react";
import { Checkbox } from 'semantic-ui-react'


const SpeechHistory = props => {

  const [completedSpeeches, setCompletedSpeeches] = useState([])
  const [populatedEvents, setPopulatedEvents] = useState([])
  const [byEvent, setByEvent] = useState(false)

  const handleToggle = () => {
    setByEvent(!byEvent)
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
    getCompletedSpeeches()
    getEventsWithSpeeches()
  }, [])

  return (
      <>
        <div className="speech-items" style={{paddingTop: 20, paddingLeft: 30}}>
            <h2>Speech History</h2>
            <Checkbox toggle label='View by event' onChange={handleToggle}/>
              {!byEvent ?
                <div>
                {completedSpeeches.map(speech => {
                  return (
                      <div key={speech.id} style={{margin: 20}}>
                          <a href={`/speeches/${speech.id}`}><h3>{speech.title}</h3></a>
                      </div>
                  )
                  })
                }
                </div>
              :
                <div>
                {populatedEvents.map(event => {
                  return (
                    <div key={event.id} style={{margin: 30}}>
                      <h3>{event.name}</h3>
                      {event.speeches.filter(speech => {
                        return speech.actual_time !== null
                      })
                      .map(speech => {
                        return (
                          <ul key={speech.id}>
                            <li>
                              <a href={`/speeches/${speech.id}`}><h4>{speech.title}</h4></a>
                            </li>
                          </ul>
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