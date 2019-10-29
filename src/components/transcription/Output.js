import React from "react"
import io from "socket.io-client"


const Output = props => {



    console.log(props)
    return (
        <>
            <article className="speechOutput">
                <button onClick={props.startRecording}>start</button>
                <button onClick={props.stopRecording}>stop</button>
                {/* <p>hello{props.interimSentence}</p> */}
                {/* <p>hello{props.finalSentence}</p> */}
            </article>

        </>
    )
}

export default Output
