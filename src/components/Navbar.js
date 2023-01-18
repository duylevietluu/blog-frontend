import { Container, Nav, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../reducers/userReducer"
import { LinkContainer } from 'react-router-bootstrap'
import { useState } from "react"


const NavbarBlog = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [expanded, setExpanded] = useState(false)

    return (
        <Navbar bg="light" expanded={expanded} expand="lg">
            <Container>
                <LinkContainer to="/"><Navbar.Brand>Blogs App</Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" 
                    onClick={()=>setExpanded(!expanded)} 
                    onBlur={() => setTimeout(setExpanded(false), 4000)} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/"><Nav.Link>Blogs</Nav.Link></LinkContainer>
                        <LinkContainer to="/users"><Nav.Link>Users</Nav.Link></LinkContainer>
                        {   
                            user ?
                            <Nav.Link onClick={() => dispatch(logoutUser())}>Logout</Nav.Link> :
                            <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                        }
                    </Nav>
                    <Nav>
                        <Navbar.Text>
                            {user && `logged in as ${user.name}`}
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarBlog