import React, { useState, useReducer, useRef, useEffect, useContext } from 'react'
import Highlighter from 'react-highlight-words'
import { AudioStreamer } from '../modules/AudioStreamer'
import NewSpeechModal from '../speech/NewSpeechModal'
import microphone from '../../images/microphone.png'
import Timer from '../timer/Timer'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css'
import APIManager from '../modules/APIManager'
import { Button } from 'semantic-ui-react'
import './Output.css'

function reducer(currentState, newState) {
  return {...currentState, ...newState}
}

const Output = props => {

    const elipsis = '...'
    const [prompts, setPrompts] = useState([])
    const [selectedPrompt, setSelectedPrompt] = useState(null)
    const [wordCount, setWordCount] = useState([])
    const [isListening, setIsListening] = useState(false)
    const [ready, setReady] = useState(false)
    const [open, setOpen] = useState()
    const [speech, setSpeech] = useState()

    const [{running, lapse}, setState] = useReducer(reducer, {
          running: false,
          lapse: 0,
        })
    const intervalRef = useRef(null)
    const promptRef = useRef('')

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

    const selectButtonClick = (prompt) => {
      setSelectedPrompt(prompt)
      setOpen(true)
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
        AudioStreamer.startRecording()
        handleRunClick()
    }

    const stopButtonClick = () => {
      setIsListening(false)
      AudioStreamer.stopRecording0()
      handleRunClick()
      getCurrentSpeech()
      console.log(wordCount)
    }

    const getPrompts = () => {
      APIManager.get("prompts")
      .then(setPrompts)
    }

    const getCurrentSpeech = () => {
      fetch('http://localhost:8000/speeches?incomplete=true', {
          "method": "GET",
          "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("oratio_token")}`
          }
      })
      .then(response => response.json())
      .then((response) => {
        console.log(response)
          updateSpeech(response[0].id)
      })
    }

    const updateSpeech = (id) => {
      const updatedSpeechObject = {
        actual_time: lapse,
        transcript: props.finalOutput,
        um: count(props.finalOutput, 'um '),
        uh: count(props.finalOutput, 'uh '),
        like: count(props.finalOutput, 'like'),
      }
      APIManager.put("speeches", updatedSpeechObject, id)
      .then(() => {
        props.history.push(`/speeches/${id}`)
      })
    }

    useEffect(() => {
      if (window.location.pathname === "/interview") {
        getPrompts()
      }

    }, [wordCount])

console.log(wordCount)
    return (
      <>
        <article className="speech-output">
          <NewSpeechModal {...props} setReady={setReady}
            setOpen={setOpen}
            open={open}
            selectedPrompt={selectedPrompt}
          />
          {window.location.pathname === "/interview" ?
            <Slider>
              {prompts.map((prompt) => {
                return (
                  <div key={prompt.id}>
                    <h2 className="prompt-text" ref={promptRef} value={prompt.prompt}>{prompt.prompt}</h2>
                    <Button color="purple" onClick={() => selectButtonClick(prompt.id)}>Select</Button>
                  </div>
                )}
              )}
            </Slider>
          : ""}
          <div className="panel">
            <Timer {...props} lapse={lapse} running={running}/>
            {ready ?
            <div>
              {!isListening ?
                <div>
                  <img className="record-button" onClick={startButtonClick} alt="Start" id="start_img" src={microphone}></img>
                </div>
                :
                <div>
                  <img className="pulse-button" onClick={stopButtonClick} alt="Stop" id="stop_img" src={microphone}></img>
                </div>
              }
            </div>
            : ""}
            <p className="interim-string">interim {props.interimSentence + elipsis}</p>
          </div>
          <div className="letter" id="pattern">
            <Highlighter
                id="content"
                highlightClassName="highlighted-words"
                searchWords={["like", " so ", "okay", "you know"]}
                autoEscape={true}
                textToHighlight={props.finalOutput}
                highlightStyle={{backgroundColor: '#f8d129', color: 'white'}}
                 />
          </div>
        </article>

      </>
    )
}

export default Output
