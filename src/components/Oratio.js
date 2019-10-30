import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import io from "socket.io-client";
// import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import {AudioStreamer} from "./modules/AudioStreamer";

// const socket = io('http://127.0.0.1:1337')
const socket = io.connect('http://localhost:1337')
    socket.on('connect', () => {
        console.log('Successfully connected!');
      });

const Oratio = () => {
    // const [response, setResponse] = useState([])
    // const [endpoint, setEndpoint] = useState([])



    // socket.on('connect',(data) => {
    //     socket.emit('join', 'Server Connected to Client');
    // });

    // socket.on('messages', (data) => {
    //     console.log(data);
    // });

    // useEffect(() => {
    //     socket.on("FromAPI", data => setResponse(data));
    // }, [])

    return (
        <React.Fragment>
            {/* <Route render={props => (
                <NavBar {...props} />
            )} /> */}
            <ApplicationViews socket={socket} />
            {/* <AudioStreamer socket={socket}/> */}
        </React.Fragment>
    )
}

export {Oratio, socket}
