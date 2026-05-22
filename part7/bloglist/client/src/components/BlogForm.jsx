import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { useNotificationActions } from '../stores/notificationStore'
import { useBlogActions } from '../stores/blogStore'
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
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }

  return (
    <div>
      <h2> Add a new blog </h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input
              type='text'
              value={newTitle.value}
              onChange={newTitle.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type='text'
              value={newAuthor.value}
              onChange={newAuthor.onChange}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type='text'
              value={newUrl.value}
              onChange={newUrl.onChange}
            />
          </label>
        </div>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm
