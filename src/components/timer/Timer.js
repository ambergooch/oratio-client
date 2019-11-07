import React from 'react'
import './Timer.css'

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
    </div>
  )
}

export default Timer