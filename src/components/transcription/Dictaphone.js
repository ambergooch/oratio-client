
import React, {Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

const options = {
    autoStart: false,
    continuous: false,
  }

// const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
// const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// const grammar = 'um, uh, umm, uhh'
// const recognition = new webkitSpeechRecognition();
// const speechRecognitionList = new SpeechGrammar;
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;

// recognition.grammars.addFromString(grammar, 1)

class Dictaphone extends Component {


  render() {
    const { transcript,
            // resetTranscript,
            startListening,
            stopListening,
            browserSupportsSpeechRecognition,
            // recognition
    } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    console.log(this.props)
    return (
      <div>
        <button onClick={startListening}>start</button>
        <button onClick={stopListening}>stop</button>
        <span>{transcript}</span>
      </div>
    )
  }
}

export default SpeechRecognition(options)(Dictaphone)