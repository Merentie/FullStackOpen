import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, likeAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'LIKE':
      return `You liked '${action.payload}'`
    case 'ADD':
      return `You added '${action.payload}'`
	case 'ERROR':
		return 'too short anecdote, must have 5 or more'
    case 'HIDE':
      return null
    default:
      return null
  }
}
const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  )

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div> anecdote service not available due to problems in server </div>
  }

  console.log(result)
  const anecdotes = result.data
  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />
        {anecdotes.map((anecdote) => (
          <AnecdoteList anecdote={anecdote} key={anecdote.id} />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
