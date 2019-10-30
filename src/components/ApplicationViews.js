import React, { useState } from "react"
import { Route, withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Dictaphone from "./transcription/Dictaphone"
import Output from "./transcription/Output"

const ApplicationViews = (props) => {

    const [interimSentence, setInterimSentence] = useState([])
    const [finalSentence, setFinalSentence] = useState([])
    const [finalOutput, setFinalOutput] = useState([])

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
            console.log("Google Speech sent 'final' Sentence and it is:");
            console.log(finalString);
            setFinalSentence(finalString)
            setFinalOutput(finalOutput.concat(finalSentence))
        }
    };

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
                        finalOutput={finalOutput}
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


