import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { useNotificationActions } from '../stores/notificationStore'
import { useBlogActions } from '../stores/blogStore'
import { TextField, Button, Typography, Box } from '@mui/material'
import blogService from '../services/blogs'

const BlogForm = () => {
  const newTitle = useField('title')
  const newAuthor = useField('author')
  const newUrl = useField('url')
  const setNotification = useNotificationActions()
  const { setBlogs } = useBlogActions()
  const navigation = useNavigate()

  const handleNewBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setNotification(
        `a new blog ${blog.title} by ${blog.author} added`,
        'green',
        4,
      )
      navigation('/')
    } catch {
      setNotification('failed to create a new blog', 'red', 4)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    handleNewBlog({
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
    })
  }

  return (
    <Box>
      <Typography variant='h4' sx={{ marginTop: 1 }}>
        Add a new blog
      </Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            id='outline-controlled'
            type='text'
            size='small'
            label='title'
            sx={{ marginTop: 1 }}
            value={newTitle.value}
            onChange={newTitle.onChange}
          />
        </div>
        <div>
          <TextField
            id='outline-controlled'
            type='text'
            size='small'
            label='author'
            sx={{ marginTop: 1 }}
            value={newAuthor.value}
            onChange={newAuthor.onChange}
          />
        </div>
        <div>
          <TextField
            id='outline-controlled'
            type='text'
            size='small'
            label='url'
            sx={{ marginTop: 1 }}
            value={newUrl.value}
            onChange={newUrl.onChange}
          />
        </div>
        <Button variant='contained' type='submit' sx={{ marginTop: 1.5 }}>
          save
        </Button>
      </form>
    </Box>
  )
}

export default BlogForm
