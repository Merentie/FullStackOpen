import { useField } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUserService from '../services/persistentUser'
import { useNotificationActions } from '../stores/notificationStore'
import { useUserActions } from '../stores/userStore'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, Box } from '@mui/material'

const LoginForm = () => {
  const username = useField('username')
  const password = useField('password')
  const navigate = useNavigate()
  const setNotification = useNotificationActions()
  const { setUser } = useUserActions()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      persistentUserService.saveUser(user)
      blogService.setToken(user.token)
      setUser(user)

      navigate('/')
    } catch {
      setNotification('wrong credentials', 'red', 4)
    }
  }
  return (
    <div>
      <Typography variant='h4' sx={{ marginTop: 1 }}>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id='outline-controlled'
            type='text'
            size='small'
            label='username'
            sx={{ marginTop: 1 }}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          <TextField
            id='outline-controlled'
            type='password'
            size='small'
            label='password'
            sx={{ marginTop: 1 }}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <Button variant='contained' type='submit' sx={{ marginTop: 1.5 }}>
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
