import { useNavigate } from 'react-router-dom'
import { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes()

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name='content'
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name='author'
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input name='info' value={info.value} onChange={info.onChange} />
        </div>
        <button type='submit'>create</button>
        <button
          type='button'
          onClick={() => {
            content.reset()
            author.reset()
            info.reset()
          }}
        >
          reset
        </button>
      </form>
    </div>
  )
}

export default CreateNew
