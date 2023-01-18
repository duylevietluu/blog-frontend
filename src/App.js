import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import User from './components/User'
import Blog from './components/Blog'
import { Container } from 'react-bootstrap'
import NavbarBlog from './components/Navbar'
import Message from './components/Message'

const App = () => {
  const dispatch = useDispatch()

  // AT LOADING PAGE: LOAD BLOGS,USERS AND PAST USER
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initUser())
    dispatch(initUsers())
  }, [dispatch])

  return (
    <>
      <Message />
      <NavbarBlog />
      <Container>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users /> } />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
