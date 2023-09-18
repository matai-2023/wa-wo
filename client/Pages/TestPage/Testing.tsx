import { useState } from 'react'
import request from 'superagent'
export default function Testing() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.currentTarget
    const form = new FormData(target)

    await request.post('/api/v1/upload').send(form)
  }

  return (
    <div className="justify-self-center">
      <form onSubmit={handleSubmit}>
        <input type="text" name="age" defaultValue={'55'} />
        <input type="file" name="image" accept="images/*" />
        <button> Submit</button>
      </form>
    </div>
  )
}
