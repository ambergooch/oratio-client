import React, { useState } from 'react'
import Highlighter from 'react-highlight-words'
import { AudioStreamer } from '../modules/AudioStreamer'
import NewSpeechModal from '../speech/NewSpeechModal'
import mic from '../../images/mic.gif'
import micAnimate from '../../images/micAnimate.gif'


const Output = props => {

    const [wordCount, setWordCount] = useState({})
    const [isListening, setIsListening] = useState(false)

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
          <NewSpeechModal />
            <article className='speechOutput'>
            {!isListening ?
                <img onClick={startButtonClick} alt="Start" id="start_img" src={mic}></img>
                :
                <img onClick={stopButtonClick} alt="Stop" id="stop_img" src={micAnimate}></img>
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
