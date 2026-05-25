import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button, AppBar, Toolbar, Box, Typography } from '@mui/material'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import { useBlogActions } from './stores/blogStore'
import { useUserActions } from './stores/userStore'
import blogService from './services/blogs'
import persistentUserService from './services/persistentUser'
import userService from './services/users'

const App = () => {
  const { setBlogs } = useBlogActions()
  const { setUser, setUsers } = useUserActions()
  const navigation = useNavigate()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [setBlogs])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [setUsers])

  useEffect(() => {
    const loggedUserJSON = persistentUserService.getUser()
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    persistentUserService.removeUser()
    navigation('/')
  }

  return (
    <div>
      <AppBar position='static'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h4'>Blapp</Typography>
          <Box>
            <Button color='inherit' component={Link} to='/'>
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
            {!persistentUserService.getUser() ? (
              <Button color='inherit' component={Link} to='/login'>
                login
              </Button>
            ) : (
              <>
                <Button color='inherit' component={Link} to='/create'>
                  create a new blog
                </Button>
                <Button color='inherit' onClick={handleLogout}>
                  logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Notification />
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/create' element={<BlogForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='*' element={<h1>404 - Page not found</h1>} />
      </Routes>
    </div>
  )
}

export default App
