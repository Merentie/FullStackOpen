import { useBlogs, useBlogActions } from '../stores/blogStore'
import { useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useUser } from '../stores/userStore'
import { TextField, Button, Typography, Box } from '@mui/material'

const Blog = () => {
  const [comment, setComment] = useState('')
  const loggedUser = useUser()
  const navigation = useNavigate()
  const blogs = useBlogs()
  const { setBlogs } = useBlogActions()
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const handleLike = async (blog) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const updatedBlog = await blogService.update(blog.id, newBlog)
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const handleComment = async () => {
    const newComments = blog.comments
    newComments.push(comment)
    const newBlog = {
      ...blog,
      comments: newComments,
    }
    const updatedBlog = await blogService.update(newBlog.id, newBlog)
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
    setComment('')
  }

  const handleRemove = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      navigation('/')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 0.5,
    paddingBottom: 10,
  }

  if (!blog) {
    return <h1> 404 - Page not found </h1>
  }

  const username = loggedUser === null ? null : loggedUser.username

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <Typography variant='h4'>{blog.title}</Typography>
      </div>
      <Typography variant='h6'>by {blog.author}</Typography>
      <div>
        <Typography variant='subtitle1'>
          <a href={blog.url}>{blog.url}</a>
        </Typography>
        <div>
          <Typography variant='body1'>Added by {blog.user.name}</Typography>
        </div>
        <div>
          <Typography variant='body1'>
            {blog.likes} likes
            {loggedUser && (
              <Button
                variant='outlined'
                sx={{ marginLeft: 0.5 }}
                onClick={() => handleLike(blog)}
              >
                like
              </Button>
            )}
          </Typography>
        </div>
        {username === blog.user.username && (
          <div>
            <Button
              variant='contained'
              sx={{ marginTop: 0.75 }}
              onClick={() => handleRemove(blog)}
            >
              remove
            </Button>
          </div>
        )}
      </div>
      <div>
        <Typography variant='h5' sx={{ marginTop: 1 }}>
          comments
        </Typography>
      </div>
      {loggedUser && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleComment()
            }}
          >
            <TextField
              id='outline-controlled'
              type='text'
              size='small'
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button variant='contained' type='submit'>
              save
            </Button>
          </form>
        </div>
      )}
      {blog.comments.map((comment, i) => (
        <ul key={i}>
          <li> {comment} </li>
        </ul>
      ))}
    </div>
  )
}

export default Blog
