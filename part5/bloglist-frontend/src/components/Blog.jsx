import { useState } from 'react'


const Blog = ({ blogInit, handleLike, handleRemove, loggedUser }) => {
  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(blogInit)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'show'}</button>
      {visible &&
        <div>
          <div>
            {blog.url}
          </div>
          <div>
            likes: {blog.likes}
            <button onClick={() => handleLike(blog, setBlog)}> like </button>
          </div>
          <div>
            {blogInit.user.name}
          </div>
          {loggedUser.username===blog.user.username &&
            <div>
              <button onClick={() => handleRemove(blog)}> remove </button>
            </div>
          }

        </div>
      }
    </div>
  )
}

export default Blog