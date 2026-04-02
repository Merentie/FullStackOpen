import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: () => {
        notificationDispatch({ type: 'ERROR' })
        setTimeout(() => {
            notificationDispatch('HIDE')
        }, 5000)
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })  
        notificationDispatch({ type: 'ADD', payload: data.content })
        setTimeout(() => {
            notificationDispatch('HIDE')
        }, 5000)
    },

  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
