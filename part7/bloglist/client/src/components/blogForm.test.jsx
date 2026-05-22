import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('Check that the event handler recieves the right prop', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog}/>)
  const titleInput = screen.getByLabelText('title:')
  await user.type(titleInput, 'Testing 123')
  const authorInput = screen.getByLabelText('author:')
  await user.type(authorInput, 'Tester')
  const urlInput = screen.getByLabelText('url:')
  await user.type(urlInput, 'test.com')
  const button = screen.getByText('save')
  await user.click(button)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing 123')
  expect(createBlog.mock.calls[0][0].author).toBe('Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})