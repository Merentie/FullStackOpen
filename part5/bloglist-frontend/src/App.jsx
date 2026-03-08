import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [style, setStyle] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setStyle('red')
      setNotificationMessage('wrong credentials')
      setTimeout(() => {
        setNotificationMessage('')
      }, 4000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleNewBlog = async blogObject => {
    try {
      const blog = await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      blogFormRef.current.toggleVisibility()
      setStyle('green')
      setNotificationMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setNotificationMessage('')
      }, 4000)
    } catch {
      setStyle('red')
      setNotificationMessage('all fields are required')
      setTimeout(() => {
        setNotificationMessage('')
      }, 4000)
    }
  }
  const handleLike = async (blog, setBlog) => {
    const newBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes+1 })
    setBlog(newBlog)
  }

  const handleRemove = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
                username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
                password
              <input
                type="password"
                value={password}
                onChange= {({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleNewBlog} />
      </Togglable>
    )
  }

  const bLoggedIn = () => {
    return (
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}> logout </button> </p>
        {blogForm()}
        {blogs.sort((a,b) => a.likes < b.likes).map(blog =>
          <Blog key={blog.id} blogInit={blog} handleLike={handleLike} handleRemove={handleRemove} loggedUser={user}/>
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} style={style}/>
      <h2>Blogs</h2>
      {!user && loginForm()}
      {user && bLoggedIn()}
    </div>
  )
}

export default App