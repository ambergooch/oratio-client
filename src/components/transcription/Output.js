import React, { useState, useEffect } from "react"
import io from "socket.io-client"
import {AudioStreamer, interimString, finalString} from "../modules/AudioStreamer"


const Output = props => {

    const [interimSentence, setInterimSentence] = useState([])
    const [finalOutput, setFinalOutput] = useState([])
    // const [finalSentence, setFinalSentence] = useState([])

    const finalArray = []

    useEffect(() => {
        const hello = 0
        // finalArray.push(props.finalSentence)
        // sessionStorage.setItem('final', finalArray)
        // setFinalOutput(oldArray => [...oldArray, props.finalSentence])
        // if (props.finalSentence.length > 0) {
        //     setFinalOutput(finalOutput.concat(props.finalSentence))
        // }
    })

        // const [finalOutput, setFinalOutput] = useState(
        //   () => JSON.parse(localStorage.getItem('finalOutput'))
        // );
        // useEffect(() => {
        //     setFinalOutput(props.finalSentence)
        //   localStorage.setItem('finalOutput', JSON.stringify(finalOutput));
        // }, ['finalOutput', finalOutput]);
        // // return [finalOutput, setFinalOutput];



    // useEffect(() => {
    //     sessionStorage.setItem('final_output', finalArray.push(props.finalSentence))
    //     // setFinalOutput(finalArray)
    //     // assignFinalOutput()

    // })
    // const assignFinalOutput = ( string ) => {
    //     localStorage.setItem( 'finalSentence', string );
    //     setFinalOutput(string);
    // }


    console.log('finalSentence', props.finalSentence)
    console.log('props', props)
    console.log('finalArray', finalArray)
    return (
        <>
            <article className="speechOutput">
                <button onClick={AudioStreamer.startRecording}>start</button>
                <button onClick={AudioStreamer.stopRecording}>stop</button>
                <p>interim{props.interimSentence}</p>
                <p>final{props.finalSentence}</p>
                <p>final{finalOutput}</p>
            </article>

        </>
    )
}

export default Output
