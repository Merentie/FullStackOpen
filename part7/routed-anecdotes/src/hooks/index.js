import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {  
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = async (anecdote) => {
        await anecdoteService.createNew({ ...anecdote })
        setAnecdotes(anecdotes.concat({ ...anecdote }))
    }

    const deleteAnecdote = (anecdote) => {
        anecdoteService.remove(anecdote.id)
        setAnecdotes(anecdotes.filter(a => a.id !== anecdote.id))
    }

    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    }
}