import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import 'semantic-ui-css/semantic.min.css'
import { Menu, Container, Dropdown, Icon } from 'semantic-ui-react'

const NavBar = props => {

    const { isAuthenticated, logout } = useSimpleAuth()
    const [activeItem, setActiveItem] = useState('')
    const [currentUser, setCurrentUser] = useState([])

    const handleItemClick = (e, { name }) => setActiveItem(name)

    const getCurrentUser = () => {
      if (isAuthenticated()) {
        fetch('http://localhost:8000/users?currentuser=true', {
            "method": "GET",
            "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("oratio_token")}`
            }
        })
        .then(response => response.json())
        .then((response) => {
            setCurrentUser(response)
        })
      }
    }

    const handleLogout = (e) => {
        logout()
        window.location = "/landing"
    }

    useEffect(getCurrentUser, [])
      return (
        <>
          <Menu borderless stackable color="purple" style={{position: 'sticky', top: 0, zIndex: 5, marginBottom: 2, boxShadow: "3px 3px 10px black" }}>
            <Menu.Item as={Link} to='/landing' color="purple">
              <Icon circular inverted size='large' color='purple' name='comment' />
            </Menu.Item>

            <Menu.Item
              as={Link}
              to='/practice'
              name='practice'
              color='purple'
              active={activeItem === 'practice'}
              onClick={handleItemClick}
            >
              Practice Mode
            </Menu.Item>

            <Menu.Item
              as={Link}
              to='/interview'
              name='interview'
              color='purple'
              active={activeItem === 'interview'}
              onClick={handleItemClick}
            >
              Interview Mode
            </Menu.Item>
              <Container fluid style={{marginRight: '100px'}}>
                  <Menu.Item className='' position='right' onClick={handleItemClick} style={{ marginRight: '.5em'}}>
                  </Menu.Item>
                  <Menu.Item style={{padding: '4px', border: 'none'}}>
                      {currentUser.map(user => {
                        console.log(user)
                        return <strong key={user.id}>{user.first_name} {user.last_name}</strong>
                      })}
                  </Menu.Item>

                  <Dropdown item simple direction='left' style={{border: 'none'}}>
                  <Dropdown.Menu style={{width: 100}}>
                      <Dropdown.Item style={{paddingBottom: 20}} as={Link} to="/speeches" >History</Dropdown.Item>
                      <Dropdown.Item style={{paddingBottom: 20}} onClick={(e) => {handleLogout(e)}}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>
              </Container>
          </Menu>
        </>
      )
    }


export default NavBar