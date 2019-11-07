import React from 'react';
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Button, Grid, Container } from 'semantic-ui-react'
import Typing from 'react-typing-animation'
import "./LandingPage.css"

const Landing = props => {

    const { isAuthenticated } = useSimpleAuth()

    return (
        <div className="landing-page" >
            <Container>
                <Grid columns={1} relaxed='very' stackable textAlign='center'>
                    <Container style={{marginTop: '200px', width: '2000px'}} fluid >
                        <Typing startDelay={1000} speed={120} loop={true}>
                            <span className='title'>ORATIO</span>
                            <Typing.Backspace delay={6000} count={7} speed={120}/>
                        </Typing>
                        {!isAuthenticated() ?
                        <div>
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
                        </div>
                        :
                        <div>
                            <Button className="auth-button"
                                content='Practice Mode'
                                size='big'
                                color='blue'
                                style={{borderRadius: 0, marginRight: 20, marginTop: 40}}
                                onClick={() => {
                                    props.history.push({
                                        pathname: "/practice"
                                    })
                                }}
                            />
                            <Button className="auth-button"
                                content='Interview Mode'
                                size='big'
                                color='blue'
                                style={{borderRadius: 0}}
                                onClick={() => {
                                    props.history.push({
                                        pathname: "/interview"
                                    })
                                }}
                            />
                        </div>
                        }
                    </Container>
                </Grid>
            </Container>
        </div>
    )
}

  export default Landing