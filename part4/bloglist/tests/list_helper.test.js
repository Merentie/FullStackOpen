const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('best blog', () => {
  const blogList = [
    {
      _id: '1',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 7,
      __v: 0
    },
    {
      _id: '2',
      title: 'abc kissa kävelee',
      author: 'perttu',
      url: 'blog.com',
      likes: 8,
      __v: 0
    }
  ]


  test('select the blog with more likes', () => {
    const result = listHelper.favoriteBlog(blogList)
    assert.deepStrictEqual(result, blogList[1])
  })
  test('when list has no entries, return null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
})

describe('most blogs', () => {
  const blogList = [
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

  test('select the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogList)
    assert.deepStrictEqual(result, { author: 'perttu', blogs: 2 })
  })
})
describe('most likes', () => {
  const blogList = [
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
  test('select the author with the most likes', () => {
    const result = listHelper.mostLikes(blogList)
    assert.deepStrictEqual(result, { author: 'perttu', likes: 12 })
  })
})