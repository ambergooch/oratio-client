import React, {useReducer, useState, useRef, useEffect} from 'react'
import './Timer.css'

function reducer(currentState, newState) {
  return {...currentState, ...newState}
}

const Timer = props =>  {
//   const [{running, lapse}, setState] = useReducer(reducer, {
//     running: false,
//     lapse: 0,
//   })
//   const [time, setTime] = useState()

  const intervalRef = useRef(null)

  const convertToMinutesAndSeconds = (mil) => {
    const minutes = Math.floor(mil / 60000);
    const seconds = ((mil % 60000) / 1000).toFixed(0);
    const time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    return time
  }

  return (
    <div style={{textAlign: 'center'}}>
      <label
        style={{
          fontSize: '5em',
          display: 'block',
        }}
      >
        {convertToMinutesAndSeconds(props.lapse)}

      </label>
      <button className='timer-button' onClick={props.handleRunClick}>
        {props.running ? 'Stop' : 'Start'}
      </button>
      {/* <button className='timer-button' onClick={props.handleClearClick}>
        Clear
      </button> */}
    </div>
  )
}

export default Timer