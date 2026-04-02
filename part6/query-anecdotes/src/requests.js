const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }
  return await response.json()
}

export const createAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
    }
    
    const response = await fetch(baseUrl, options)
    
    if (!response.ok) {
        throw new Error('Failed to create anecdote')
    }

    return await response.json()
}

export const likeAnecdote = async (anecdote) => {
    const response = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            content: anecdote.content,
            votes: anecdote.votes+1,
            id: anecdote.id
        })
    })

    if (!response) {
        throw new Error('Failed to update anecdote')
}}