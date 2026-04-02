import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


const AnecdoteList = ({anecdote}) => {
    const { notificationDispatch } = useContext(NotificationContext)
    const queryClient = useQueryClient()

    const likeAnecdoteMutation = useMutation({
        mutationFn: likeAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    const handleVote = (anecdote) => {
        likeAnecdoteMutation.mutate(anecdote)
        notificationDispatch({ type: 'LIKE', payload: anecdote.content })
        setTimeout(() => {
            notificationDispatch('HIDE')
        },5000)
    }  

    return (
        <div>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
    )
}

export default AnecdoteList