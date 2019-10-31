import React from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"


const Oratio = () => {

    const { isAuthenticated } = useSimpleAuth()

    return (
        <React.Fragment>
            {isAuthenticated() ?
            <Route render={props => (
                <NavBar {...props} />
            )} />
            : ""}
            <ApplicationViews />
        </React.Fragment>
    )
}

export default Oratio
