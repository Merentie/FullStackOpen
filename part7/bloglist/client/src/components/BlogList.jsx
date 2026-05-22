import Blog from './Blog'
import { Link } from 'react-router-dom'
import { useBlogs } from '../stores/blogStore'

const BlogList = () => {
  const blogs = useBlogs()
  return (
    <div>
      {blogs
        .sort((a, b) => a.likes < b.likes)
        .map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div>
              {blog.title} by {blog.author}
            </div>
          </Link>
        ))}
    </div>
  )
}

export default BlogList
