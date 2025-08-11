const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7
    },
    {
      title: 'abc kissa kävelee',
      author: 'perttu',
      url: 'blog.com',
      likes: 8
    },
    {
      title: 'tikapuita pitkin',
      author: 'perttu',
      url: 'blog2.com',
      likes: 4
    },
    {
      title: 'on scratch',
      author: 'johannes',
      url: 'blog3.com',
      likes: 9
    }
]

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[3])
    await blogObject.save()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)})

after(async () => {
  await mongoose.connection.close()
})