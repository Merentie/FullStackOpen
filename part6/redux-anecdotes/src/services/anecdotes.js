const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0}),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const vote = async (id) => {
    const response = await fetch(`${baseUrl}/${id}`)

    if (!response) {
        throw new Error('Failed to find anecdote')
    }

    const anecdote = await response.json()

    const response2 = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            content: anecdote.content,
            votes: anecdote.votes+1,
            id: anecdote.id
        })
    })

    if (!response2) {
        throw new Error('Failed to update anecdote')
    }
}

export default { getAll, createNew, vote }