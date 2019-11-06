import React, {useReducer, useState, useRef, useEffect} from 'react'
import './Timer.css'

function reducer(currentState, newState) {
  return {...currentState, ...newState}
}

const Timer = props =>  {

  const convertToMinutesAndSeconds = (mil) => {
    const minutes = Math.floor(mil / 60000);
    const seconds = ((mil % 60000) / 1000).toFixed(0);
    const time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    return time
  }

  return (
    <div className='timer-output'>
    {/* <div className={`timer-output ${timeExceeded ? 'red': ''}`}> */}
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {convertToMinutesAndSeconds(props.lapse)}

      </label>
      {/* <button className='timer-button' onClick={props.handleRunClick}>
        {props.running ? 'Stop' : 'Start'}
      </button> */}
      {/* <button className='timer-button' onClick={props.handleClearClick}>
        Clear
      </button> */}
    </div>
  )
}

export default Timer