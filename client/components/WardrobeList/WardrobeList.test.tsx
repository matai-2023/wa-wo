//@vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest'
import * as auth0 from '@auth0/auth0-react'
import { renderComponent } from '../../test-utils'
import WardrobeList from './WardrobeList'
import userEvent from '@testing-library/user-event'

vi.mock('@auth0/auth0-react')
;(auth0 as auth0.User).useAuth0 = vi.fn().mockReturnValue({
  isAuthenticated: true,
  isLoading: false,
  getAccessTokenSilently: vi.fn(),
})
const user = userEvent.setup()

describe('Song List Item', () => {
  it('should render a media player when the user clicks the button', async () => {
    const item = {
      id: 2,
      user_id: '123',
      name: 'test-nickname',
      description: 'Ryan',
      category: 'Ng',
      part: 'top',
      image: 'ur',
    }

    const screen = renderComponent(
      <WardrobeList wardrobe={item} handleDeleteItem={() => {}} />
    )
    const frame = screen.getByTestId('iframe')
    expect(frame).toBeInTheDocument()
  })
})
