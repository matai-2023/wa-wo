# Authentication with JSON Web Tokens (JWTs)

This repo contains a working app that includes CRUD operations for fruit. It has the beginnings of authentication such as a `<Nav>` component with buttons for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.

Our task is to complete the authentication implementation of this app.

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Commands might look like this:

    ```sh
    npm install --legacy-peer-deps
    npm run knex migrate:latest
    npm run knex seed:run
    npm run dev
    ```
  </details>

- [ ] Visit [http://localhost:5173](http://localhost:5173) in your browser

Figma for the product:
- [ ] https://www.figma.com/file/90gb9sCPXmWqbpT3aAsRPR/Untitled?type=design&node-id=0-1&mode=design&t=KS0MNucImrvuIZJy-0


## Overview

In order to complete the implementation of authentication for this app, we need to make changes on both the client-side and the server-side to enable user registration and sign-in. We're also going to protect certain routes (the ones that alter data) so that only authenticated users can call them. 


## Cheatsheet

<details>
  <summary>Open cheatsheet</summary>

```tsx
// importing and using the useAuth0 hook
import { useAuth0 } from '@auth0/auth0-react'

function MyComponent() {
  const { isAuthenticated, user, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0()


  // ...
}
```

```tsx
// retrieve access token to give to API functions
  // async/await
  async function handleMyEvent() {
    const token = await getAccessTokenSilently()
    const response = await fetchFromApi(token)
  }

  // or
  // .then/.catch
  function handleMyEvent() {
    getAccessTokenSilently()
      .then((token) => {
        return fetchFromApi(token)
      })
      .then((response) => {/* ... */})
  }
```

```ts
// secure an API route
router.get('/my-protected-route', checkJwt, (req, res) => {
  //                              ^? this is the middleware
  // user is authenticated
  const userId = req.auth?.sub
  // ...
})
```
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=jwt-auth)
