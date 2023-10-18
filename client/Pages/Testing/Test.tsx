import { useState } from 'react'
import Button from '../../components/UI/Button/Button'

export default function Test() {
  const [file, setFile] = useState<File | null>(null)
  console.log(file)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {}
  return (
    <div>
      <h1>Testing</h1>
      <input
        type="file"
        className="w-full m-4 border-2 rounded-lg p-2 cursor-pointer hover:scale-105 duration-100 hover:border-orange hover:text-white hover:bg-orange"
        name="image"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <Button>Submit</Button>
    </div>
  )
}
