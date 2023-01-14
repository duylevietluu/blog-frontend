import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('when submit form, form correctly provide info the handler', async() => {
    const toSubmit = { title: "We are", author: "We writes", url: "Connect us!" }

    const mockHandler = jest.fn()

    render(<BlogForm sendBlogTo={mockHandler}/>)

    // click the "new blog" button
    const user = userEvent.setup()
    const viewButton = screen.getByText('new blog')
    await user.click(viewButton)

    // fill in the form
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], toSubmit.title)
    await user.type(inputs[1], toSubmit.author)
    await user.type(inputs[2], toSubmit.url)

    const submitButton = screen.getByText('submit')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0]).toEqual(toSubmit)
})