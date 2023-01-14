import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState("")

  // login form
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

  // new blog form
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })
  const handleNewBlog = async(event) => {
    event.preventDefault()
    try {
      const returnedBlog = await blogService.create(newBlog)
      setNewBlog({ title: "", author: "", url: "" })
      setBlogs(blogs.concat(returnedBlog))
    } catch (error) {
      setErrorMessage('ERROR: sth')

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
    }
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
        <div>{errorMessage}</div>
        <form onSubmit={handleLogin}>
          <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }


  // user is logged in
  return (
    <div>
      <h2>blogs</h2>
      <div>{errorMessage}</div>
      <div>
        logged in as {user.name} 
        <button onClick={handleLogout}>logout</button>
      </div>

      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
            title
            <input
              type="text"
              value={newBlog.title}
              name="title"
              onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
            />
        </div>
        <div>
            author
            <input
              type="text"
              value={newBlog.author}
              name="author"
              onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
            />
        </div>
        <div>
            url
            <input
              type="text"
              value={newBlog.url}
              name="url"
              onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
            />
        </div>
        <button type="submit">submit</button>
      </form>

      {blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
    </div>
  )
}

export default App
