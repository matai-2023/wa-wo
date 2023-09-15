// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'

import { renderComponent } from '../../test-utils'
import FindFriends from './FindFriend'

vi.mock('@auth0/auth0-react')
;(auth0 as auth0.User).useAuth0 = vi.fn().mockReturnValue({
  isAuthenticated: true,
  isLoading: false,
  getAccessTokenSilently: vi.fn(),
})

describe('Find Friends', () => {
  it('display friend containing search query', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/users/search?q=`)
      .reply(200, [])
    const { user } = renderComponent(<FindFriends />)
    await user.click(screen.getByRole('button', { name: 'Find' }))

    await waitFor(() => expect(scope.isDone()).toBeTruthy())

    const message = screen.getByText(/No rcmndrs match/i)
    expect(message).toBeInTheDocument()
  })
})
