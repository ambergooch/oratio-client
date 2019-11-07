import React, { useEffect, useState, useRef } from "react";
import APIManager from "../modules/APIManager";
import SpeechDetails from "./SpeechDetails"
import { Checkbox, Grid } from 'semantic-ui-react'
import Slider from 'react-animated-slider';


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
                    <div key={event.id}>
                      <ul>{event.name}</ul>
                      {event.speeches.filter(speech => {
                        return speech.actual_time !== null
                      })
                      .map(speech => {
                        return (
                          // <Slider className='history-slider'>
                            <Grid relaxed columns={4}>
                              <Grid.Column>
                                <a href={`/speeches/${speech.id}`}><h3>{speech.title}</h3></a>

                              </Grid.Column>
                            </Grid>
                            /* <div style={{width: '50%', height: '50%'}}>

                            </div> */
                          /* </Slider> */
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