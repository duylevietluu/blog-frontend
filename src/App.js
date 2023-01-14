import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState("")

  // for login form
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setErrorMessage('SUCCESS: login')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setErrorMessage('ERROR: wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }
  const handleLogout = async() => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }


  const handleLike = blog => {
    const newBlog = {...blog, user: blog.user.id, likes: blog.likes + 1} 
    blogService
      .update(blog.id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(item => item.id === blog.id ? {...blog, likes: blog.likes + 1} : item))
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleRemove = blog => {
    if (window.confirm(`remove ${blog.title}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(item => item.id !== blog.id))
          setErrorMessage(`SUCCESS: removed ${blog.title}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(`ERROR: cannot remove`)
          console.error(error.response || error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  // for blog form
  const handleNewBlog = newBlog => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setErrorMessage(`SUCCESS: created new blog ${newBlog.title}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
      .catch(error => {
        if (error.response === undefined || error.response.data === undefined) {
          setErrorMessage('ERROR: unknown error, see console')
          console.error(error.response || error)
        }
        else {
          setErrorMessage('ERROR: ' + error.response.data.error)
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })    
  }

  // AT LOADING PAGE: LOAD BLOG AND PAST USER
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  // user is logged out
  if (user === null) {
    return (
      <div>
        <h2>log in</h2>
        <strong>{errorMessage}</strong>
        <LoginForm
          username={username}
          password={password}
          handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  // user is logged in
  return (
    <div>
      <h2>blogs app</h2>
      <div>{errorMessage}</div>
      <div>
        logged in as {user.name} 
        <button onClick={handleLogout}>logout</button>
      </div>

      <BlogForm sendBlogTo={handleNewBlog}/>

      <h2>blogs feed</h2>
      <Blogs 
        blogs={blogs} 
        handleLike={handleLike} 
        currentUser={user} 
        handleRemove = {handleRemove} 
      />
    </div>
  )
}

export default App
