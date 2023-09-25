import { useAuth0 } from '@auth0/auth0-react'
import Button from '../../components/UI/Button/Button'
import request from 'superagent'

export default function Test() {
  const { getAccessTokenSilently } = useAuth0()
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const token = await getAccessTokenSilently()
    await request
      .post('/api/v1/likes/upload')
      .set('Authorization', `Bearer ${token}`)
      .send(form)
  }
  return (
    <div>
      <h1>Testing</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          className="w-full m-4 border-2 rounded-lg p-2 cursor-pointer hover:scale-105 duration-100 hover:border-orange hover:text-white hover:bg-orange"
          name="image"
          required
        />
        <Button>Submit</Button>
      </form>
    </div>
  )
}
