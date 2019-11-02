import React, { useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

// import "./Login.css"


const Login = props => {

    const username = useRef()
    const password = useRef()
    const { login } = useSimpleAuth()

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()

        /*
            For now, just store the username and password that
            the customer enters into local storage.
        */
        const credentials = {
            "username": username.current.value,
            "password": password.current.value
        }

        login(credentials)
            .then(() => {
                window.location = "/"
            })
    }

    return (
        <main style={{textAlign:"center"}}>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src='/logo.png' /> Please Sign In
                </Header>
                <Form size='huge' onSubmit={handleLogin}>
                    <Segment stacked size='huge' style={{ height: 350, borderRadius: '10px' }}>
                        <Form.Field style={{marginTop: 40, marginBottom: 30}}>
                            <input ref={username}
                                type="text"
                                className="form-control"
                                placeholder='Username'
                                required autoFocus/>
                        </Form.Field>
                        <Form.Field style={{marginTop: 0, marginBottom: 30}}>
                            <input ref={password}
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder='Password'
                                required />
                        </Form.Field>
                        {/* <Form.Input ref={password}
                            fluid
                            type="password"
                            className="form-control"
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            required autoFocus
                        /> */}

                    <Button type='submit' color='teal' fluid size='huge'>
                        Login
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    New here? <a href='/register'>Sign Up</a>
                </Message>
                </Grid.Column>
            </Grid>
        </main>
    )
}


export default Login