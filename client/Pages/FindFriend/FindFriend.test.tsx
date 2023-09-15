// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { getByPlaceholderText, screen, waitFor } from '@testing-library/react'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'

import { renderComponent, renderWithQuery } from '../../test-utils'
import FindFriends from './FindFriend'

vi.mock('@auth0/auth0-react')
;(auth0 as auth0.User).useAuth0 = vi.fn().mockReturnValue({
  isAuthenticated: true,
  isLoading: false,
  getAccessTokenSilently: vi.fn(),
})

describe('Find Friends', () => {
  it('1. Display friend based on query input', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/users/all`)
      .reply(200, [
        {
          auth0_id: 'auth0|111',
          nickname: 'apple',
        },
      ])

    // screen renders
    const { user } = renderWithQuery(<FindFriends />)
    // user enters 'a' into input
    await user.type(screen.getByPlaceholderText('Enter a nickname'), 'a')

    await waitFor(() => expect(scope.isDone()).toBeTruthy())
    const nickname = screen.getByRole('heading', { level: 3 })

    expect(nickname).toBeInTheDocument()
  })
  it('2. Display "no friend found" with empty input', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/users/all')
      .reply(200, [
        {
          auth0_id: 'auth0|111',
          nickname: 'stu',
        },
      ])
    // screen renders
    const { user } = renderWithQuery(<FindFriends />)
    // user enters 'a' into input
    await user.type(screen.getByPlaceholderText('Enter a nickname'), ' ')
    await waitFor(() => expect(scope.isDone()).toBeTruthy())
    const error = screen.getByText('No friends found')
    expect(error).toBeInTheDocument()
  })
  it('3. Display "no friend found" with unmatched input', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/users/all')
      .reply(200, [
        {
          auth0_id: 'auth0|111',
          nickname: 'stu',
        },
      ])
    const { user } = renderWithQuery(<FindFriends />)
    await user.type(screen.getByPlaceholderText('Enter a nickname'), 'a')
    await waitFor(() => expect(scope.isDone()).toBeTruthy())
    const error = screen.getByText('No friends found')
    expect(error).toBeInTheDocument()
  })
  it('4. Friend list is empty when page renders/refreshed', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/users/all')
      .reply(200, [])

    renderWithQuery(<FindFriends />)
    await waitFor(() => expect(scope.isDone()).toBeTruthy())
    const list = screen.queryByTestId('friendList')
    expect(list).toBeNull()
  })
})
