import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Testing 123',
  author: 'Tester',
  url: 'test.com',
  likes: 0,
  user: {
    name: 'jaakko'
  }
}

test('site renders the title and author of the blog', () => {
  const { container } = render(<Blog blogInit={blog}/>)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Testing 123'
  )
  expect(div).toHaveTextContent(
    'Tester'
  )
})

test('site does not initially render the URL and likes of the blog',() => {
  const { container } = render(<Blog blogInit={blog}/>)

  const div = container.querySelector('.blog')
  expect(div).not.toHaveTextContent(
    'likes: 0'
  )
  expect(div).not.toHaveTextContent(
    'test.com'
  )
})

test('URL and likes are shown after clicking the button', async () => {
  const { container } = render(<Blog blogInit={blog}/>)
  const user = userEvent.setup()
  const div = container.querySelector('.blog')
  const button = screen.getByText('show')
  await user.click(button)
  expect(div).toHaveTextContent(
    'likes: 0'
  )
  expect(div).toHaveTextContent(
    'test.com'
  )
})

test('if the like button is clicked twice, the event handler the component recieved as props is called twice', async () => {
  const likeBlog = vi.fn()
  const user = userEvent.setup()
  render(<Blog blogInit={blog} handleLike={likeBlog}/>)
  const showButton = screen.getByText('show')
  await user.click(showButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(likeBlog.mock.calls).toHaveLength(2)
})