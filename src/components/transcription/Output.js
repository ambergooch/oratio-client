import React from "react"
import { AudioStreamer } from "../modules/AudioStreamer"

const Output = props => {

    const count = (main_str, sub_str) => {
        main_str += '';
        sub_str += '';

        if (sub_str.length <= 0)
        {
            return main_str.length + 1;
        }

        let subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
        console.log((main_str.match(new RegExp(subStr, 'gi')) || []).length)
    }

    const stopButtonClick = () => {
        AudioStreamer.stopRecording()
        count(props.finalOutput, "the")
    }

    return (
        <>
            <article className="speechOutput">
                <button onClick={AudioStreamer.startRecording}>start</button>
                <button onClick={stopButtonClick}>stop</button>
                <p>interim {props.interimSentence}</p>
                <p>final {props.finalSentence}</p>
                <p>final output {props.finalOutput}</p>
            </article>

        </>
    )
}

export default Output
