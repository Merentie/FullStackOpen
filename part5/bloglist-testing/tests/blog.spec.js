const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
        data: {
            name: 'Test Tester',
            username: 'testerman',
            password: 'ilovetesting'
        }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('testerman')
      await page.getByRole('textbox').last().fill('ilovetesting')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Test Tester logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('testerman')
      await page.getByRole('textbox').last().fill('ilovetestink')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('wrong credentials')).toBeVisible()
      await expect(page.getByText('Test Tester logged in')).not.toBeVisible()
    })

  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('testerman')
      await page.getByRole('textbox').last().fill('ilovetesting')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'new blog'}).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('On blogging')
      await textboxes[1].fill('Blogger Bloggerson')
      await textboxes[2].fill('blogger.com')
      await page.getByRole('button', { name: 'save' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog'}).click()
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill('On testing')
      await textboxes[1].fill('Test Tester')
      await textboxes[2].fill('testing.test')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a new blog On Testing by Test Tester added')).toBeVisible()
      await expect(page.getByText('On Testing Test Tester')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'show' }).click()
      await expect(page.getByText('likes: 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('blog can be deleted by its creator', async ({ page }) => {
      await expect(page.getByText('On blogging Blogger Bloggerson')).toBeVisible()
      await page.getByRole('button', { name: 'show' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('On blogging Blogger Bloggerson')).not.toBeVisible()
    })

    test('remove button is not visible for other users', async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
        data: {
            name: 'Not Test Tester',
            username: 'nottesterman',
            password: 'notilovetesting'
        }
      })
      await page.getByRole('button', { name: 'logout'}).click()
      await page.getByRole('textbox').first().fill('nottesterman')
      await page.getByRole('textbox').last().fill('notilovetesting')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', {name: 'show'}).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })
  })
})