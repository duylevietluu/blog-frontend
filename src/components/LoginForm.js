import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setPassword, setUsername } from "../reducers/loginFormReducer"
import { loginUser } from "../reducers/userReducer"
import { Button, Form } from "react-bootstrap"

const LoginForm = ({ onLogin }) => {
    const dispatch = useDispatch()
    const { username, password } = useSelector(state => state.loginForm)
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(loginUser({ username, password }, () => navigate('/')))
    }

    return (<>
        <h3>log in</h3>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>username: </Form.Label>
                <Form.Control type="text" name="username" value={username} 
                    onChange={event => dispatch(setUsername(event.target.value))} />
                <Form.Label>password: </Form.Label>
                <Form.Control type="password" name="password" value={password} 
                    onChange={event => dispatch(setPassword(event.target.value))} />

                <Button variant="primary" type="submit">login</Button>
            </Form.Group>
        </Form>
    </>)
}


export default LoginForm