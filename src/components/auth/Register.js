import React, { useRef } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'

// import "./Login.css"


const Register = props => {
    const userName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const { register } = useSimpleAuth()

    const handleRegister = (e) => {
        e.preventDefault()

        const newUser = {
            "username": userName.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "first_name": firstName.current.value,
            "last_name": lastName.current.value
        }

        register(newUser).then(() => {
            window.location = "/"
        })
    }

    return (
        <main style={{textAlign:"center"}}>
            <Grid textAlign='center' style={{ height: '160vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 600 }}>
                <Header as='h2' color='purple' textAlign='center'>
                    <Icon size='small' color='purple' name='comment' />
                     Register for Oratio
                </Header>
                <Form size='huge' onSubmit={handleRegister}>
                    <Segment stacked size='huge' style={{ height: 740, borderRadius: '10px' }}>
                        <Form.Field style={{margin: 40}}>
                            <input ref={userName}
                                type="text"
                                className="form-control"
                                placeholder='Username'
                                required autoFocus/>
                        </Form.Field>
                        <Form.Field style={{margin: 40}}>
                            <input ref={email}
                                type="email"
                                className="form-control"
                                placeholder='Email'
                                required />
                        </Form.Field>
                        <Form.Field style={{margin: 40}}>
                            <input ref={password}
                                type="password"
                                className="form-control"
                                placeholder='Password'
                                required />
                        </Form.Field>
                        <Form.Field style={{margin: 40}}>
                            <input ref={verifyPassword}
                                type="password"
                                className="form-control"
                                placeholder='Verify Password'
                                required />
                        </Form.Field>
                        <Form.Field style={{margin: 40}}>
                            <input ref={firstName}
                                type="text"
                                className="form-control"
                                placeholder='First Name'
                                required />
                        </Form.Field>
                        <Form.Field style={{margin: 40}}>
                            <input ref={lastName}
                                type="text"
                                className="form-control"
                                placeholder='Last Name'
                                required />
                        </Form.Field>
                    <Button type='submit' color='purple'fluid size='huge'>
                        Register
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    Already registered? <a href='/login'>Sign In</a>
                </Message>
                </Grid.Column>
            </Grid>
        </main>
    )
}
export default withRouter(Register)