import React, { useState } from "react"
import { Link } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import 'semantic-ui-css/semantic.min.css'
import { Menu, Container, Dropdown } from 'semantic-ui-react'


//     return (
//         <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow navbar1">
//             <ul className="nav nav-pills nav-fill">
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/">Home</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/products">Products</Link>
//                 </li>
//                 <li className="nav-item">
//                     <Link className="nav-link" to="/orders">Orders</Link>
//                 </li>
//                 {
//                     isAuthenticated() ?
//                     <>
//                     <li className="nav-item">
//                     <Link className="nav-link" to="/myproducts">My Products</Link>
//                     </li>
//                     <li className="nav-item">
//                     <Link className="nav-link" to="/myaccount">My Account</Link>
//                         </li>
//                         <li className="nav-item">
//                             <button className="nav-link fakeLink logout-link"
//                                 onClick={() => {
//                                     logout()
//                                     props.history.push({
//                                         pathname: "/"
//                                     })
//                                 }
//                                 }
//                             >Logout</button>
//                         </li>
//                         </> :
//                         <>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/login">Login</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/register">Register</Link>
//                         </li>
//                         </>

//                 }
//             </ul>
//         </nav>
//     )
// }

const NavBar = props => {

    const { isAuthenticated, logout } = useSimpleAuth()
    const [activeItem, setActiveItem] = useState({})

    const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name })

    const handleLogout = (e) => {
        logout()
        // props.history.push({
        //     pathname: "/landing"
        // })
        window.location = "/landing"
    }

      return (
        <>
        {/* {isAuthenticated === true ? */}
        <Menu stackable style={{position: 'sticky', top: 0, zIndex: 5, marginBottom: 5, boxShadow: "3px 3px 10px #d4d4d4" }}>
          <Menu.Item>
            <img src='https://react.semantic-ui.com/logo.png' />
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/practice'
            name='practice'
            active={activeItem === 'practice'}
            onClick={handleItemClick}
          >
            Practice Mode
          </Menu.Item>

          <Menu.Item
            as={Link}
            to='/interview'
            name='interview'
            active={activeItem === 'interview'}
            onClick={handleItemClick}
          >
            Interview Mode
          </Menu.Item>
            <Container fluid style={{marginRight: '100px'}}>
                <Menu.Item className='' position='right' onClick={handleItemClick} style={{ marginRight: '.5em'}}>

                </Menu.Item>
                {/* <Menu.Item as={Link} to="/" style={{padding: '4px'}}>
                    <Image src={this.state.currentUser.image} style={{ marginRight: '.5em', borderRadius: 100, width: 45 }} />
                </Menu.Item> */}
                <Dropdown item simple direction='left' style={{border: 'none'}}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/history">History</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {handleLogout(e)}}>Logout</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Container>

          {/* <Menu.Item
            as={Link}
            to="/login"
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={handleItemClick}
          >
            Sign-in
          </Menu.Item> */}
        </Menu>
        {/* : "" } */}
        </>
      )
    }


export default NavBar