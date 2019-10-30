import React, { useState, useEffect, useRef } from "react"
import { Route, withRouter } from "react-router-dom"
import io from "socket.io-client";
import Register from "./auth/Register"
import Login from "./auth/Login"
import Dictaphone from "./transcription/Dictaphone"
import Output from "./transcription/Output"
import  { AudioStreamer, interimString, finalString } from "./modules/AudioStreamer"
// import { interimString, finalString } from "./modules/AudioStreamer"
// import {socket} from "./Oratio"

// const newSentenceState = null

const ApplicationViews = (props) => {

    const [interimSentence, setInterimSentence] = useState([])
    const [finalSentence, setFinalSentence] = useState([])

    const mounted = useRef()
    window.newSentenceState = (data) => {
        // console.log(data.results[0].alternatives[0].transcript);
        var dataFinal = undefined || data.results[0].isFinal;

        if (dataFinal === false) {
            let interimString = data.results[0].alternatives[0].transcript;
            console.log(interimString)
            setInterimSentence(interimString)

        } else if (dataFinal === true) {
            //log final string
            let finalString = data.results[0].alternatives[0].transcript;
            if (!mounted.current) {
                mounted.current = true
            } else {

                setFinalSentence(finalString)
            }
            console.log("Google Speech sent 'final' Sentence and it is:");
            console.log(finalString);

            // finalWord = true;
            // removeLastSentence = false;
        }
    };

    useEffect(() => {
        // setInterimSentence(AudioStreamer.initSpeechData())
        // setFinalSentence(finalString)
    }, [])

    // const [interimSentence, setInterimSentence] = useState([])
    // const [finalSentence, setFinalSentence] = useState([])

// console.log(finalSentence)

    console.log('props', props)
    // console.log('interim', interimSentence)
    // console.log('interim', interimSentence)
    return (
        <React.Fragment>

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />
            <Route
                exact path="/" render={props => {
                    return <Output {...props}

                        interimSentence={interimSentence}
                        finalSentence={finalSentence}
                        />
                }}
            />
            <Route
                path="/practice" render={props => {
                    return <Dictaphone {...props} />
                }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)
// export {this.newSentenceState}

