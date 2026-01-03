const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {    
      return response.status(401).json({ error: 'token invalid' })  
    }  
  const user = request.user
  if (!user) {
    return response.status(400).json({error: 'userId missing or not valid'})
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(blog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {    
      return response.status(401).json({ error: 'token invalid' })  
    }  
  const user = request.user
  if (!user) {
    return response.status(400).json({error: 'userId missing or not valid'})
  }
  
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({error: 'invalid blog id'})
  } else if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(id)
      response.status(204).json(blog)
  } else {
      return response.status(403).json({error: 'you do not have the permission to delete this blog'})
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    blog.likes += 1
    await blog.save()
    response.status(201).json(blog)
  } else {
    response.status(404).json({error: 'invalid blog id'})
  }
})

module.exports = blogsRouter