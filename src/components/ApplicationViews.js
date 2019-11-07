import React, { useState, useEffect } from "react"
import { Route, withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Output from "./transcription/Output"
import LandingPage from "./landing/LandingPage"
import SpeechHistory from "./speech/SpeechHistory"
import SpeechDetails from "./speech/SpeechDetails"

const ApplicationViews = (props) => {

    const [interimSentence, setInterimSentence] = useState('')
    const [finalSentence, setFinalSentence] = useState('')
    const [finalOutput, setFinalOutput] = useState('')
    const [currentSpeech, setCurrentSpeech] = useState([{}])

    const convertToMinutesAndSeconds = (mil) => {
        const minutes = Math.floor(mil / 60000);
        const seconds = ((mil % 60000) / 1000).toFixed(0);
        const time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        return time
    }

    window.newSentenceState = (data) => {
        var dataFinal = undefined || data.results[0].isFinal;
        if (dataFinal === false) {
            let interimString = data.results[0].alternatives[0].transcript;
            console.log(interimString)
            setInterimSentence(interimString)

        } else if (dataFinal === true) {
            //log final string
            let finalString = data.results[0].alternatives[0].transcript;
            console.log("Google Speech sent 'final' Sentence and it is:");
            console.log(finalString);
            setFinalSentence(finalString)
            setFinalOutput(finalOutput.concat(' ', finalString))
        }
    };

    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <LandingPage {...props} />
                }}
            />

            <Route
                path="/landing" render={props => {
                    return <LandingPage {...props} />
                }}
            />

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
                exact path="/practice" render={props => {
                    return <Output {...props}
                        interimSentence={interimSentence}
                        finalSentence={finalSentence}
                        finalOutput={finalOutput}
                        getCurrentSpeech={getCurrentSpeech}
                        currentSpeech={currentSpeech}
                    />
                }}
            />

            <Route
                exact path="/interview" render={props => {
                    return <Output {...props}
                        interimSentence={interimSentence}
                        finalSentence={finalSentence}
                        finalOutput={finalOutput}
                        getCurrentSpeech={getCurrentSpeech}
                        currentSpeech={currentSpeech}
                    />
                }}
            />

            <Route
                path="/speeches/:speechId(\d+)" render={props => {
                    return <SpeechDetails {...props} convert={convertToMinutesAndSeconds} />
                }}
            />

            <Route
                exact path="/speeches" render={props => {
                    return <SpeechHistory {...props} convert={convertToMinutesAndSeconds} />
                }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)


