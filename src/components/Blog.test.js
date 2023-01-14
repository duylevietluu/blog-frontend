import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
    title: "Duy's success II",
    author: "Duy Le",
    url: "nothing",
    likes: 10,
    user: {
        username: "thanhvip6a4",
        name: "thanh",
    }
}
const currentUserInfo = {
    username: "thanhvip6a4",
    name: "thanh",
}

test('at start, render author and title, not url or like', () => {
    render(<Blog blog={blog} currentUser={currentUserInfo} />)

    let element = screen.queryByText(blog.title + " " + blog.author)
    expect(element).toBeDefined()

    element = screen.queryByText(blog.url)
    expect(element).toBeNull()

    element = screen.queryByText(blog.likes)
    expect(element).toBeNull()
})

test('at click, show url and like', async() => {
    render(<Blog blog={blog} currentUser={currentUserInfo} />)

    // click the view button
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    let element = screen.queryByText(blog.url)
    expect(element).toBeDefined()

    element = screen.queryByText(blog.likes)
    expect(element).toBeDefined()
})

test('if like button is clicked twice, the function clicked twice', async() => {
    const mockLikeHandler = jest.fn()

    render(<Blog blog={blog} currentUser={currentUserInfo} handleLike={mockLikeHandler} />)

    // click the view button
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    // click the like button twice
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
})