import { useField } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import persistentUserService from '../services/persistentUser'
import { useNotificationActions } from '../stores/notificationStore'
import { useUserActions } from '../stores/userStore'
import { useNavigate } from 'react-router-dom'

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
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              value={username.value}
              onChange={username.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              value={password.value}
              onChange={password.onChange}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
