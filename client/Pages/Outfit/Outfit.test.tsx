import { describe, it, expect, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'
import { renderWithQuery } from '../../test-utils'
import { screen } from '@testing-library/react'
import Outfit from './Outfit'
vi.mock('@auth0/auth0-react')
;(auth0 as auth0.User).useAuth0 = vi.fn().mockReturnValue({
  isAuthenticated: true,
  isLoading: false,
  user: {
    sub: 'auth0|123',
  },
  getAccessTokenSilently: vi.fn(),
})

describe('Outfit page', () => {
  it('1. Should render a friend list on the screen to click on', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/users/friends')
      .reply(200, [
        {
          auth0_id: 'test-123',
          nickname: 'test-nickname',
        },
      ])
    renderWithQuery(<Outfit />)
    await waitFor(async () => {
      expect(scope.isDone()).toBeTruthy()
    })
    const button = screen.getByRole('button', { name: 'test-nickname' })
    expect(button).toBeInTheDocument()
  })
  it('2. should render a list of outfit onto the screen', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/outfits/all')
      .reply(200, [
        {
          accessories: 'test-acc',
          bottom: 'test-bot',
          date_posted: 1234567891234,
          description: 'test-desc',
          footwear: 'test-foot',
          id: 5,
          img: 'test-link',
          nickname: 'test-User',
          outer: 'test-Jacket',
          top: 'test-top',
          user_id: 'test-userId',
        },
      ])
    renderWithQuery(<Outfit />)
    await waitFor(async () => {
      expect(scope.isDone()).toBeTruthy()
    })
    const owner = screen.getByRole('heading', { name: 'test-User' })
    const top = screen.getByText('test-top')
    const bottom = screen.getByText('test-bot')

    expect(owner).toBeInTheDocument()
    expect(top).toBeInTheDocument()
    expect(bottom).toBeInTheDocument()
  })
})
