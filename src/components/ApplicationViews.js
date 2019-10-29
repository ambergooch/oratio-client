import React, { useState } from "react"
import { Route, withRouter } from "react-router-dom"
import io from "socket.io-client";
import Register from "./auth/Register"
import Login from "./auth/Login"
import Dictaphone from "./transcription/Dictaphone"
import Output from "./transcription/Output"

const ApplicationViews = (props) => {

    const [interimSentence, setinterimSentence] = useState([])
    const [finalSentence, setfinalSentence] = useState([])

    //connection to socket
    const socket = io.connect('http://localhost:1337')
    socket.on('connect', () => {
        console.log('Successfully connected!');
      });

    //================= CONFIG =================
    // Stream Audio
    let bufferSize = 2048,
        AudioContext,
        context,
        processor,
        input,
        globalStream;

    //vars
    let finalWord = false,
        streamStreaming = false,
        removeLastSentence = true
        // audioElement = document.querySelector('audio'),
        // resultText = document.getElementById('ResultText'),
        // recognitionDataArray = [],
        // interimSentence = '',
        // finalSentence = '',
        // internCurrentHoCount = 0,
        // internTotalHoCount = 0,
        // publicTotalHoCount = 0;

    let params = {
        startedRecording: false,
    }

    //audioStream constraints
    const constraints = {
        audio: true,
        video: false
    };

    //================= RECORDING =================

    function initRecording() {
        socket.emit('startGoogleCloudStream', ''); //init socket Google Speech Connection
        streamStreaming = true;
        AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext({
            // if Non-interactive, use 'playback' or 'balanced' // https://developer.mozilla.org/en-US/docs/Web/API/AudioContextLatencyCategory
            latencyHint: 'interactive',
        });
        processor = context.createScriptProcessor(bufferSize, 1, 1);
        processor.connect(context.destination);
        context.resume();

        var handleSuccess = function (stream) {
            globalStream = stream;
            input = context.createMediaStreamSource(stream);
            input.connect(processor);

            processor.onaudioprocess = function (e) {
                microphoneProcess(e);
            };
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(handleSuccess);

    }

    function microphoneProcess(e) {
        var left = e.inputBuffer.getChannelData(0);
        var left16 = downsampleBuffer(left, 44100, 16000)
        socket.emit('binaryData', left16);
    }

    // //================= INTERFACE =================
    // // var startButton = document.getElementById("startRecButton");
    // // startButton.addEventListener("click", startRecording);

    // // var endButton = document.getElementById("stopRecButton");
    // // endButton.addEventListener("click", stopRecording);
    // // endButton.disabled = true;

    function startRecording() {
        if (params.startedRecording){return}
        params.startedRecording = true;
        initRecording();
    }

    function stopRecording() {
        if (!streamStreaming){return} // stop disconnecting if already disconnected;

        streamStreaming = false;
        socket.emit('endGoogleCloudStream', '');

        let track = globalStream.getTracks()[0];
        track.stop();

        input.disconnect(processor);
        processor.disconnect(context.destination);
        context.close().then(function () {
            input = null;
            processor = null;
            context = null;
            AudioContext = null;
        });
    }

    //================= SOCKET IO =================
    socket.on('connect', function (data) {
        socket.emit('join', 'Server Connected to Client');
    });

    socket.on('messages', function (data) {
        console.log(data);
    });

    socket.on('speechData', function (data) {
        // console.log(data.results[0].alternatives[0].transcript);
        var dataFinal = undefined || data.results[0].isFinal;

        if (dataFinal === false) {
            let interimString = data.results[0].alternatives[0].transcript;
            console.log(interimString);
            // setinterimSentence(interimString)

        } else if (dataFinal === true) {
            //log final string
            let finalString = data.results[0].alternatives[0].transcript;
            console.log("Google Speech sent 'final' Sentence and it is:");
            console.log(finalString);
            // setfinalSentence(finalString)

            finalWord = true;
            removeLastSentence = false;
        }
    });

    //================= OTHER STUFF =================

    window.onbeforeunload = function () {
        if (streamStreaming) { socket.emit('endGoogleCloudStream', ''); }
    };

    //================= SANTAS HELPERS =================

    var downsampleBuffer = function (buffer, sampleRate, outSampleRate) {
        if (outSampleRate == sampleRate) {
            return buffer;
        }
        if (outSampleRate > sampleRate) {
            throw "downsampling rate show be smaller than original sample rate";
        }
        var sampleRateRatio = sampleRate / outSampleRate;
        var newLength = Math.round(buffer.length / sampleRateRatio);
        var result = new Int16Array(newLength);
        var offsetResult = 0;
        var offsetBuffer = 0;
        while (offsetResult < result.length) {
            var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
            var accum = 0, count = 0;
            for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accum += buffer[i];
                count++;
            }

            result[offsetResult] = Math.min(1, accum / count)*0x7FFF;
            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }
        return result.buffer;
    }

    console.log(props)
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
                        startRecording={startRecording}
                        stopRecording={stopRecording}
                        interimSentence={interimSentence}
                        finalSentence={finalSentence} />
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