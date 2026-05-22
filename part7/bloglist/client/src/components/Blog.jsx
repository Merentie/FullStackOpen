import { useBlogs, useBlogActions } from '../stores/blogStore'
import { useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useUser } from '../stores/userStore'
import { TextField, Button } from '@mui/material'

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
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!blog) {
    return <h1> 404 - Page not found </h1>
  }

  const username = loggedUser === null ? null : loggedUser.username

  return (
    <div style={blogStyle} className='blog'>
      <h1>{blog.title}</h1>
      by {blog.author}
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>Added by {blog.user.name}</div>
        <div>
          likes: {blog.likes}
          {loggedUser && (
            <button onClick={() => handleLike(blog)}> like </button>
          )}
        </div>
        {username === blog.user.username && (
          <div>
            <button onClick={() => handleRemove(blog)}> remove </button>
          </div>
        )}
      </div>
      <h2>comments</h2>
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
