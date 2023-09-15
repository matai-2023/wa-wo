// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { waitFor, render } from '@testing-library/react'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'
import FriendsWardrobe from './FriendsWardrobe'
import { screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  Route,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from 'react-router-dom'

vi.mock('@auth0/auth0-react')
;(auth0 as auth0.User).useAuth0 = vi.fn().mockReturnValue({
  isAuthenticated: true,
  isLoading: false,
  getAccessTokenSilently: vi.fn(),
})

describe('My Friends wardrobe', () => {
  it('1. Should render friends wardrobe', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/users/find/auth0%7C6500f4b1f6aa1817d80e5465`)
      .reply(200, {
        nickname: {
          nickname: 'Aloha',
        },
        robes: [
          {
            id: 2,
            user_id: 'test-id',
            name: 'test-name',
            description: 'test-description',
            category: 'test-top',
            part: 'top',
            image: '/IMG_5428.jpg',
          },
        ],
      })
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createMemoryRouter(
            createRoutesFromElements(
              <Route path="/friend/:id" element={<FriendsWardrobe />} />
            ),
            {
              initialEntries: ['/', '/friend/auth0%7C6500f4b1f6aa1817d80e5465'],
              initialIndex: 1,
            }
          )}
        />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy()
    })
    const wardrobeName = screen.getByRole('heading', { level: 1 })
    expect(wardrobeName).toContain(/Aloha/i)
  })

  it('2. Should render friends wardrobe', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/users/find/auth0%7C6500f4b1f6aa1817d80e5465`)
      .reply(200, {
        nickname: {
          nickname: 'Aloha',
        },
        robes: [
          {
            id: 2,
            user_id: 'test-id',
            name: 'test-name',
            description: 'test-description',
            category: 'test-top',
            part: 'top',
            image: '/IMG_5428.jpg',
          },
        ],
      })
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createMemoryRouter(
            createRoutesFromElements(
              <Route path="/friend/:id" element={<FriendsWardrobe />} />
            ),
            {
              initialEntries: ['/', '/friend/auth0%7C6500f4b1f6aa1817d80e5465'],
              initialIndex: 1,
            }
          )}
        />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy()
    })
    const wardrobeDescription = screen.getByTestId('test')
    expect(wardrobeDescription).toBeTruthy()
  })

  it('3. Should render friends wardrobe', async () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/users/find/auth0%7C6500f4b1f6aa1817d80e5465`)
      .reply(200, {
        nickname: {
          nickname: 'Aloha',
        },
        robes: [
          {
            id: 2,
            user_id: 'test-id',
            name: 'test-name',
            description: 'test-description',
            category: 'test-top',
            part: 'top',
            image: '/IMG_5428.jpg',
          },
        ],
      })
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createMemoryRouter(
            createRoutesFromElements(
              <Route path="/friend/:id" element={<FriendsWardrobe />} />
            ),
            {
              initialEntries: ['/', '/friend/auth0%7C6500f4b1f6aa1817d80e5465'],
              initialIndex: 1,
            }
          )}
        />
      </QueryClientProvider>
    )
    await waitFor(() => {
      expect(scope.isDone()).toBeTruthy()
    })
    const wardrobeName = screen.getByRole('heading', { level: 3 })
    expect(wardrobeName).toContain(/test-name/i)
  })

  // it('4. Display message when the wardrobe is empty', async () => {
  //   const scope = nock('http://localhost')
  //     .get(`/api/v1/users/find/auth0%7C6500f4b1f6aa1817d80e5465`)
  //     .reply(200, [])

  //   const queryClient = new QueryClient()

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <RouterProvider
  //         router={createMemoryRouter(
  //           createRoutesFromElements(
  //             <Route path="/friend/:id" element={<FriendsWardrobe />} />
  //           ),
  //           {
  //             initialEntries: ['/', '/friend/auth0%7C6500f4b1f6aa1817d80e5465'],
  //             initialIndex: 1,
  //           }
  //         )}
  //       />
  //     </QueryClientProvider>
  //   )
  //   await waitFor(() => {
  //     expect(scope.isDone()).toBeTruthy()
  //   })
  //   const message = screen.getByText('Wardrobe is empty!')
  //   expect(message).toHaveTextContent(/wardrobe/i)
  // })
})
