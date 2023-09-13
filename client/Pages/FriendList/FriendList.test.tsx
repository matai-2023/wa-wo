// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'

import { renderComponent, renderWithQuery } from '../../test-utils'
import FriendList from './FriendList'

vi.mock('@auth0/auth0-react')
;(auth0 as auth0.User).useAuth0 = vi.fn().mockReturnValue({
  isAuthenticated: true,
  isLoading: false,
  getAccessTokenSilently: vi.fn(),
})

describe('Display FriendList', () => {
  it('1. Display the users list of friends', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/users/friends`)
      .reply(200, [
        {
          auth0Id: 'testID123',
          nickname: 'BOB',
        },
      ])
    renderWithQuery(<FriendList />)

    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const name = screen.getByRole('heading', { name: 'BOB' })
    expect(name).toBeInTheDocument()
  })
  it('2. Display a message if the users does not have any friends', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/users/friends`)
      .reply(200, [])
    renderWithQuery(<FriendList />)
    await waitFor(() => expect(scope.isDone()).toBeTruthy())
    const message = screen.getByRole('heading', { level: 3 })
    expect(message).toHaveTextContent(/Sorry/i)
  })
})
