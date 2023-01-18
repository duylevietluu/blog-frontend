import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import { Link, Route, Routes } from 'react-router-dom'
import Users from './components/Users'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initUser, logoutUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()

  // AT LOADING PAGE: LOAD BLOG AND PAST USER
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initUser())
    dispatch(initUsers())
  }, [dispatch])

  const errorMessage = useSelector(state => state.message.text)
  const user = useSelector(state => state.user)

  // user is logged in
  return (
    <>
      <nav>
        <Link to="/">blogs </Link>
        <Link to="/users">users </Link>
        {
          user
          ? <em>
              logged in as {user.name}
              <button onClick={() => dispatch(logoutUser())}>logout</button>
            </em>
          : <Link to="/login">login </Link>
        }
      </nav>

      <h2>blogs app</h2>
      <strong>{errorMessage}</strong>

      {/* <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} /> */}

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<Users /> } />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
        
        
      </Routes>
    </>
  )
}

export default App
