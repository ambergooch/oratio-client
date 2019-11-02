import React, { useState, useReducer, useRef } from 'react'
import Highlighter from 'react-highlight-words'
import { AudioStreamer } from '../modules/AudioStreamer'
import NewSpeechModal from '../speech/NewSpeechModal'
import mic from '../../images/mic.gif'
import micAnimate from '../../images/micAnimate.gif'
import Timer from '../timer/Timer'
import moment from 'moment'
import 'rc-time-picker/assets/index.css'
import APIManager from '../modules/APIManager'

function reducer(currentState, newState) {
  return {...currentState, ...newState}
}

const Output = props => {

    const [wordCount, setWordCount] = useState({})
    const [isListening, setIsListening] = useState(false)
    const [{running, lapse}, setState] = useReducer(reducer, {
          running: false,
          lapse: 0,
        })
    const intervalRef = useRef(null)

    const count = (main_str, sub_str) => {
        main_str += '';
        sub_str += '';

        if (sub_str.length <= 0) {
            return main_str.length + 1;
        }

        let subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
        // console.log((main_str.match(new RegExp(subStr, 'gi')) || []).length)
    }

    const findAtFirstChar = ({
        autoEscape,
        caseSensitive,
        sanitize,
        searchWords,
        textToHighlight
      }) => {
        const chunks = [];
        const textLow = textToHighlight.toLowerCase();
        // Match at the beginning of each new word
        // New word start after whitespace or - (hyphen)
        const sep = /[-\s]+/;

        // Match at the beginning of each new word
        // New word start after whitespace or - (hyphen)
        const singleTextWords = textLow.split(sep);

        // It could be possible that there are multiple spaces between words
        // Hence we store the index (position) of each single word with textToHighlight
        let fromIndex = 0;
        const singleTextWordsWithPos = singleTextWords.map(s => {
          const indexInWord = textLow.indexOf(s, fromIndex);
          fromIndex = indexInWord;
          return {
            word: s,
            index: indexInWord
          };
        });

        // Add chunks for every searchWord
        searchWords.forEach(sw => {
          const swLow = sw.toLowerCase();
          // Do it for every single text word
          singleTextWordsWithPos.forEach(s => {
            if (s.word.startsWith(swLow)) {
              const start = s.index;
              const end = s.index + swLow.length;
              chunks.push({
                start,
                end
              });
            }
          });

          // The complete word including whitespace should also be handled, e.g.
          // searchWord='Angela Mer' should be highlighted in 'Angela Merkel'
          if (textLow.startsWith(swLow)) {
            const start = 0;
            const end = swLow.length;
            chunks.push({
              start,
              end
            });
          }
        });
        return chunks;
    }

    const handleRunClick = () => {
      if (running) {
        clearInterval(intervalRef.current)
      } else {
        const startTime = Date.now() - lapse
        intervalRef.current = setInterval(() => {
          setState({lapse: Date.now() - startTime})
        }, 0)
      }
      setState({running: !running})
    }

    const startButtonClick = () =>  {
        setIsListening(true)
        // AudioStreamer.startRecording()
        handleRunClick()
    }

    const stopButtonClick = () => {
      setIsListening(false)
      AudioStreamer.stopRecording0()
      handleRunClick()
      setWordCount({
        um: count(props.finalOutput, 'um '),
        uh: count(props.finalOutput, 'uh '),
        like: count(props.finalOutput, 'like'),
        so: count(props.finalOutput, 'so ')
      })
      updateSpeech(props.currentSpeech[0].id)
    }

    const updatedSpeechObject = {
      actual_time: lapse,
      transcript: props.finalOutput,
      um: wordCount.um,
      uh: wordCount.uh,
      like: wordCount.like
    }

    const updateSpeech = (id) => {
      APIManager.put("speeches", updatedSpeechObject, id)
      .then(() => {
        props.history.push("/")
      })
    };
    console.log(props.currentSpeech)
    return (
        <>
          <NewSpeechModal {...props} />
            <article className="speechOutput">
              {props.currentSpeech > 0 ?
              <div>
                {!isListening ?
                  <img onClick={startButtonClick} alt="Start" id="start_img" src={mic}></img>
                  :
                  <img onClick={stopButtonClick} alt="Stop" id="stop_img" src={micAnimate}></img>
                }
              </div>
              : ""}
              <Timer {...props} lapse={lapse} running={running}/>
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
