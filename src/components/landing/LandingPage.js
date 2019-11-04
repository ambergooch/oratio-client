import React from 'react';
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Button, Grid, Container } from 'semantic-ui-react'
import webbackground from '../../images/webbackground.gif'
import "./LandingPage.css"

const Landing = props => {
    console.log(localStorage.getItem("oratio_token"))
    return (
        <div className="landing-page" >
            <Container>
            <Grid columns={1} relaxed='very' stackable textAlign='center'>
                <Container style={{marginTop: '200px', width: '2000px'}} fluid >
                    {/* <Link className="auth-link" to="/login">Login</Link> */}
                <Button inverted className="auth-button"
                    content='Login'
                    size='big'
                    color='purple'
                    style={{borderRadius: 0}}
                    onClick={() => {
                        props.history.push({
                            pathname: "/login"
                        })
                    }}
                />
                <Button inverted className="auth-button"
                    content='Register'
                    size='big'
                    color='purple'
                    style={{borderRadius: 0}}
                    onClick={() => {
                        props.history.push({
                            pathname: "/register"
                        })
                    }}
                />

                </Container>

            </Grid>


            </Container>
        </div>
    )
}


  export default Landing