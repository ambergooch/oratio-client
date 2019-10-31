import io from "socket.io-client";

 // connection to socket
const socket = io('http://localhost:1337', {transports: ['websocket']})
socket.on('connect', () => {
     console.log('Successfully connected!');
});

socket.on('connect',(data) => {
    socket.emit('join', 'Server Connected to Client');
});

socket.on('messages', (data) => {
    console.log(data);
});

socket.on('receive', (data) => {
    console.log('receive', data)
})

socket.on('speechData', function (data) {
    console.log(data)
    window.newSentenceState(data)
});


//================= CONFIG =================
// Stream Audio
let bufferSize = 2048,
    AudioContext,
    context,
    processor,
    input,
    globalStream,
    finalString,
    interimString

//vars
let streamStreaming = false
    // finalWord = false
    // removeLastSentence = true
    // audioElement = document.querySelector('audio'),
    // resultText = document.getElementById('ResultText'),
    // recognitionDataArray = [],
    // interimSentence = '',
    // finalSentence = ''
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

const AudioStreamer = {

    //================= RECORDING =================
    // initSpeechData: function () {
    //     socket.on('speechData', function (data) {
    //         // console.log(data.results[0].alternatives[0].transcript);
    //         setSentenceState()
    //     });
    // },

    initRecording: function () {
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

        const handleSuccess = (stream) => {
            globalStream = stream;
            input = context.createMediaStreamSource(stream);
            input.connect(processor);

            processor.onaudioprocess = (e) => {
                this.microphoneProcess(e);
            };
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(handleSuccess);
    },

    microphoneProcess: function (e) {
        const left = e.inputBuffer.getChannelData(0);
        const left16 = this.downsampleBuffer(left, 44100, 16000)
        socket.emit('binaryData', left16);
    },

    //================= INTERFACE =================
    // var startButton = document.getElementById("startRecButton");
    // startButton.addEventListener("click", startRecording);

    // var endButton = document.getElementById("stopRecButton");
    // endButton.addEventListener("click", stopRecording);
    // endButton.disabled = true;

    startRecording: function () {
        console.log("Listening...")
        if (params.startedRecording){return}
        params.startedRecording = true;
        AudioStreamer.initRecording()
    },

    stopRecording0: function () {
        // Clear the listeners (prevents issue if opening and closing repeatedly)
        socket.emit('endGoogleCloudStream', '');
        socket.disconnect('speechData');
        socket.off('googleCloudStreamError');
        let tracks = globalStream ? globalStream.getTracks() : null;
            let track = tracks ? tracks[0] : null;
            if(track) {
                track.stop();
            }

            if(processor) {
                if(input) {
                    try {
                        input.disconnect(processor);
                    } catch(error) {
                        console.warn('Attempt to disconnect input failed.')
                    }
                }
                processor.disconnect(context.destination);
            }
            if(context) {
                context.close().then(function () {
                    input = null;
                    processor = null;
                    context = null;
                    AudioContext = null;
                });
            }
        console.log("stopped listening")
    },

    stopRecording: function () {
        // stop disconnecting if already disconnected
        if (!streamStreaming) {
            return console.log('not connected')
        }

        streamStreaming = false;
        socket.emit('endGoogleCloudStream', '');

        let track = globalStream.getTracks()[0];
        track.stop();

        input.disconnect(processor);
        processor.disconnect(context.destination);
        context.close().then(() => {
            input = null;
            processor = null;
            context = null;
            AudioContext = null;
        });
        console.log("Stopped listening")
    },



    // //================= OTHER STUFF =================

    // window.onbeforeunload = () => {
    //     if (streamStreaming) { socket.emit('endGoogleCloudStream', ''); }
    // };

    downsampleBuffer: function (buffer, sampleRate, outSampleRate) {
        if (outSampleRate === sampleRate) {
            return buffer;
        }
        if (outSampleRate > sampleRate) {
            throw new Error("downsampling rate show be smaller than original sample rate")
        }
        const sampleRateRatio = sampleRate / outSampleRate;
        const newLength = Math.round(buffer.length / sampleRateRatio);
        const result = new Int16Array(newLength);
        let offsetResult = 0;
        let offsetBuffer = 0;
        while (offsetResult < result.length) {
            const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
            let accum = 0, count = 0;
            for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accum += buffer[i];
                count++;
            }

            result[offsetResult] = Math.min(1, accum / count)*0x7FFF;
            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }
        return result.buffer;
    }
}

 export {AudioStreamer, interimString, finalString}