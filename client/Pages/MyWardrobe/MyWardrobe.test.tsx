// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'
import { renderWithQuery } from '../../test-utils'
import MyWardrobe from './MyWardrobe'
import { screen } from '@testing-library/react'
vi.mock('@auth0/auth0-react')
;(auth0 as auth0.User).useAuth0 = vi.fn().mockReturnValue({
  isAuthenticated: true,
  isLoading: false,
  user: {
    sub: 'auth0|123',
  },
  getAccessTokenSilently: vi.fn(),
})

describe('My Wardrobe', () => {
  it('1. Should render logged in users wardrobe', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/my-wardrobe')
      .reply(200, [
        {
          id: 2,
          user_id: '123',
          name: 'test-nickname',
          description: 'Ryan',
          category: 'Ng',
          part: 'top',
          image: 'ur',
        },
      ])

    renderWithQuery(<MyWardrobe />)

    await waitFor(async () => {
      expect(scope.isDone()).toBeTruthy()
    })
    const wardrobeName = await screen.getByRole('heading', { level: 3 })
    const wardrobeDescription = await screen.getByText('Ryan')
    expect(wardrobeName).toBeInTheDocument()
    expect(wardrobeDescription).toBeInTheDocument()
  })
  // it('2. Display message when the wardrobe is empty', async () => {
  //   const scope = nock('http://localhost')
  //     .get('/api/v1/my-wardrobe')
  //     .reply(200, [])

  //   renderWithQuery(<MyWardrobe />)

  //   await waitFor(async () => {
  //     expect(scope.isDone()).toBeTruthy()
  //   })
  //   const message = screen.getByText('Wardrobe is empty!')
  //   expect(message).toHaveTextContent(/wardrobe/i)
  // })

  // it('3. Selected item should be removed', async () => {
  //   const scope = nock('http://localhost')
  //     .get('/api/v1/my-wardrobe')
  //     .reply(200, [
  //       {
  //         id: 1,
  //         user_id: '123',
  //         name: 'test-nickname',
  //         description: 'Ryan',
  //         category: 'Ng',
  //         part: 'top',
  //         image: 'ur',
  //       },
  //       {
  //         id: 2,
  //         user_id: '123',
  //         name: 'test',
  //         description: 'Neil',
  //         category: 'Ng',
  //         part: 'top',
  //         image: 'ur',
  //       },
  //     ])
  //     .delete('/api/v1/my-wardrobe/2')
  //     .reply(200)
  //     .get('/api/v1/my-wardrobe')
  //     .reply(200, [
  //       {
  //         id: 1,
  //         user_id: '123',
  //         name: 'test-nickname',
  //         description: 'Ryan',
  //         category: 'Ng',
  //         part: 'top',
  //         image: 'ur',
  //       },
  //     ])

  //   const { user } = renderWithQuery(<MyWardrobe />)
  //   const buttons = await screen.findAllByRole('button')
  //   await user.click(buttons[7])
  //   await waitFor(() => {
  //     expect(scope.isDone()).toBeTruthy()
  //   })
    expect(screen.queryByText('test')).toBeNull()
  })

