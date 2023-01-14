import PropTypes from "prop-types"

const LoginForm = ({
    handleSubmit,
    username,
    handleUsername,
    password,
    handlePassword
}) => (
    <form onSubmit={handleSubmit}>
        <div>
            username
            <input
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={handleUsername}
            />
        </div>
        <div>
            password
            <input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={handlePassword}
            />
        </div>
        <button type="submit">login</button>
    </form>
)

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsername: PropTypes.func.isRequired,
    handlePassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  

export default LoginForm