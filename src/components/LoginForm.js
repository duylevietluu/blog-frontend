import { useDispatch, useSelector } from "react-redux"
import { setPassword, setUsername } from "../reducers/loginFormReducer"
import { loginUser } from "../reducers/userReducer"

const LoginForm = () => {
    const dispatch = useDispatch()
    const { username, password } = useSelector(state => state.loginForm)

    const handleSubmit = event => {
        event.preventDefault()
        dispatch(loginUser({ username, password }))
    }

    return (<>
        <h2>log in</h2>
        <form onSubmit={handleSubmit}>
            <div>
                username
                <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={event => dispatch(setUsername(event.target.value))}
                />
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={event => dispatch(setPassword(event.target.value))}
                />
            </div>
            <button type="submit">login</button>
        </form>
    </>)
}


export default LoginForm