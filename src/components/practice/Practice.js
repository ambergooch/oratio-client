import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'
import { AudioStreamer } from '../modules/AudioStreamer'
import mic from '../../images/mic.gif'
import micAnimate from '../../images/micAnimate.gif'


const Practice = props => {

    const [isListening, setIsListening] = useState(false)

    const startButtonClick = () =>  {
        setIsListening(true)
        AudioStreamer.startRecording()
    }

    const stopButtonClick = () => {
        setIsListening(false)
        AudioStreamer.stopRecording0()
        setWordCount({
            um: count(props.finalOutput, 'um '),
            uh: count(props.finalOutput, 'uh '),
            like: count(props.finalOutput, 'like'),
            so: count(props.finalOutput, 'so ')
        })
    }

    return (
        <>
            <article className='speechOutput'>
                {!isListening ?
                <button onClick={startButtonClick}>
                    <img alt="Start" id="start_img" src={mic}></img>
                </button>
                :
                <button onClick={stopButtonClick}>
                    <img alt="Stop" id="stop_img" src={micAnimate}></img>
                </button>
                }
                <p>interim {props.interimSentence}</p>
                <p>final {props.finalSentence}</p>
                <p>final output {props.finalOutput}</p>
                <Highlighter
                    highlightClassName="highlighted-words"
                    searchWords={["um ", "uh ", "like", "so ", "okay", "you know"]}
                    autoEscape={true}
                    textToHighlight={props.finalOutput}
                    highlightStyle={{backgroundColor: '#f8d129', color: 'white'}}
                    findChunks={findAtFirstChar}
                />
                <p>um count: {wordCount.um}</p>
                <p>uh count: {wordCount.uh}</p>
                <p>like count: {wordCount.like}</p>
            </article>

        </>
    )
}

export default Output
