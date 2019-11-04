import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Button, Grid, Container } from 'semantic-ui-react'
import Typing from 'react-typing-animation'
import webbackground from '../../images/webbackground.gif'
import "./LandingPage.css"



const Landing = props => {

    // const [title, setTitle] = useState('')

    // useEffect(() => {
    //     setTitle('Oratio.')
    // }, [])

    console.log(localStorage.getItem("oratio_token"))
    return (
        <div className="landing-page" >
            <Container>
            <Grid columns={1} relaxed='very' stackable textAlign='center'>
                <Container style={{marginTop: '200px', width: '2000px'}} fluid >
                    {/* <Link className="auth-link" to="/login">Login</Link> */}
                    <Typing startDelay={350} speed={120} loop={true}>
                        <span className='title'>ORATIO</span>
                        <Typing.Backspace delay={6000} count={7} speed={120}/>
                    </Typing>
                    <Button className="auth-button"
                        content='Login'
                        size='big'
                        color='blue'
                        style={{borderRadius: 0, marginRight: 20, marginTop: 40}}
                        onClick={() => {
                            props.history.push({
                                pathname: "/login"
                            })
                        }}
                    />
                    <Button inverted className="auth-button"
                        content='Register'
                        size='big'
                        color='blue'
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