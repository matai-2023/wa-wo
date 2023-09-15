// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { waitFor, render } from '@testing-library/react'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'
import { renderWithQuery } from '../../test-utils'
import FriendsWardrobe from './FriendsWardrobe'
import { screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, RouterProvider, createMemoryRouter, createRoutesFromElements } from 'react-router-dom'
import { log } from 'console'
vi.mock('@auth0/auth0-react')
;(auth0 as auth0.User).useAuth0 = vi.fn().mockReturnValue({
  isAuthenticated: true,
  isLoading: false,
  getAccessTokenSilently: vi.fn(),
})

describe('My Friends wardrobe', () => {
  it.only('1. Should render friends wardrobe', async () => {


    const id='auth0|123'
    const scope = nock('http://localhost')
      .get(`/api/v1/users/find/auth0|65010b645218b17b091d01fe`)
      .reply(200, {
        nickname: {
          nickname: "Aloha"
        },
        robes: [
          {
            id: 2,
            user_id: "test-id",
            name: "test-name",
            description: "test-description",
            category: "test-top",
            part: "top",
            image: "/IMG_5428.jpg"
          }
        ]
      })

      const queryClient = new QueryClient()
      console.log('{scope}')
      const fakeFriendComp = render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider
              router={createMemoryRouter(
                createRoutesFromElements(<Route path="/friend/auth0|65010b645218b17b091d01fe" element={<FriendsWardrobe />} />)
              )}
            />
          </QueryClientProvider>
        )
      console.log({fakeFriendComp})
    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy()
    })
    const wardrobeName = fakeFriendComp.getByRole('heading', { level: 3 })
    const wardrobeDescription = fakeFriendComp.getByText('test-nickname')
    expect(wardrobeName).toBeInTheDocument()
    expect(wardrobeDescription).toBeInTheDocument()
  })
//   it('2. Display message when the wardrobe is empty', async () => {
//     const scope = nock('http://localhost')
//       .get('/api/v1/my-wardrobe')
//       .reply(200, [])

//     renderWithQuery(<FriendsWardrobe />)

//     await waitFor(async () => {
//       expect(scope.isDone()).toBeTruthy()
//     })
//     const message = screen.getByRole('heading', { level: 3 })
//     expect(message).toHaveTextContent(/Wardrobe/i)
//   })
})
