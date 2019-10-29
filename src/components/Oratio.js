import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import io from "socket.io-client";
// import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"

const socket = io('http://127.0.0.1:1337')

const Oratio = () => {
    const [response, setResponse] = useState([])
    // const [endpoint, setEndpoint] = useState([])

    useEffect(() => {
        socket.on("FromAPI", data => setResponse(data));
    }, [])

    console.log(response)
    return (
        <React.Fragment>
            {/* <Route render={props => (
                <NavBar {...props} />
            )} /> */}
            <ApplicationViews socket={socket}/>
        </React.Fragment>
    )
}

export default Oratio
