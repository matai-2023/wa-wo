import { AddWardrobe } from '../../../types/MyWardrobe'
import Button from '../UI/Button/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@tanstack/react-query'
import { addItem, getUser } from '../../apis/api'

//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------
//---------------------------------------------------------

function AddItem() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  //---------------------------------------------------------
  //---------------------------------------------------------
  //Mutation Add
  //---------------------------------------------------------
  //---------------------------------------------------------

  const queryClient = useQueryClient()
  const mutationAdd = useMutation({
    mutationFn: ({ newItem, token }: { newItem: FormData; token: string }) =>
      addItem(newItem, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['wardrobe'])
    },
  })
  //---------------------------------------------------------
  //---------------------------------------------------------
  //Handle clicking Add Button
  //---------------------------------------------------------
  //---------------------------------------------------------

  async function handleAdd(newItem: FormData) {
    const token = await getAccessTokenSilently()
    mutationAdd.mutate({ newItem, token })
    navigate('/my-wardrobe')
  }

  //---------------------------------------------------------
  //---------------------------------------------------------
  //Making form to add
  //---------------------------------------------------------
  //---------------------------------------------------------

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await handleAdd(formData)
    queryClient.invalidateQueries(['wardrobe'])
  }

  //---------------------------------------------------------
  //---------------------------------------------------------
  //---------------------------------------------------------
  //Rendering
  //---------------------------------------------------------

  return (
    <div className="flex flex-col items-center mt-[100px] ">
      <h2 className="font-bold text-[30px]">Add new item</h2>
      <form
        onSubmit={handleSubmit}
        className="w-[300px] lg:w-[600px]  p-8 border-4 border-orange rounded-md mt-[50px]"
      >
        <div className="mb-4">
          <label className="font-semibold" htmlFor="item">
            Item *
          </label>
          <input
            className="text-black border-2 h-[40px] w-full rounded-md p-4 text-xl outline-orange"
            type="text"
            name="name"
            id="item"
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="description">
            Description *
          </label>
          <input
            className="text-black border-2 h-[40px]  w-full rounded-md p-4 text-xl outline-orange"
            type="text"
            name="description"
            id="description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="part">
            Part *
          </label>
          <input
            className="text-black border-2 h-[40px]  w-full rounded-md p-4 text-xl outline-orange"
            type="text"
            name="part"
            id="part"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="category">
            Category *
          </label>
          <select
            name="category"
            className=" m-4 border-2 rounded-lg p-2 cursor-pointer hover:scale-105 duration-100 hover:border-orange hover:text-white hover:bg-orange"
          >
            <option value={'top'}>Top</option>
            <option value={'bottom'}>Bottom</option>
            <option value={'outer'}>Outer</option>
            <option value={'footwear'}>Footwear</option>
            <option value={'accessories'}>Accessories</option>
          </select>
        </div>
        <div className="space-y-2 flex flex-col">
          <label className="font-semibold" htmlFor="image">
            Image *
          </label>
          <input
            className=" m-4 border-2 rounded-lg p-2 cursor-pointer hover:scale-105 duration-100 hover:border-orange hover:text-white hover:bg-orange"
            type="file"
            name="image"
            accept="images/*"
            id="image"
            required
          />
        </div>
        <div className="mx-auto text-center text-xl mt-[50px] lg:text-2xl lg:h-[70px]">
          <Button>Add!</Button>
        </div>
      </form>
    </div>
  )
}

export default AddItem
