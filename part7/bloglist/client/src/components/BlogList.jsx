import Blog from './Blog'
import { Link } from 'react-router-dom'
import { useBlogs } from '../stores/blogStore'
import { Typography } from '@mui/material'

const BlogList = () => {
  const blogs = useBlogs()
  return (
    <div>
      <Typography variant='h4' sx={{ marginTop: 1 }}>
        Blogs
      </Typography>
      {blogs
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div>
              <Typography variant='h6'>
                {blog.title} by {blog.author}
              </Typography>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default BlogList
