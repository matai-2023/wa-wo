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
    mutationFn: ({ newItem, token }: { newItem: AddWardrobe; token: string }) =>
      addItem(newItem, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })
  //---------------------------------------------------------
  //---------------------------------------------------------
  //Handle clicking Add Button
  //---------------------------------------------------------
  //---------------------------------------------------------

  async function handleAdd(newItem: AddWardrobe) {
    const token = await getAccessTokenSilently()
    mutationAdd.mutate({ newItem, token })
    navigate('/my-wardrobe')
  }

  //---------------------------------------------------------
  //---------------------------------------------------------
  //Getting user id from internal database
  //---------------------------------------------------------
  //---------------------------------------------------------

  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const response = await getUser(token)
      return response
    },
  })

  //---------------------------------------------------------
  //---------------------------------------------------------
  //Making form to add
  //---------------------------------------------------------
  //---------------------------------------------------------

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const part = formData.get('part') as string
    const image = formData.get('image') as string

    const form = {
      user_id: data.auth0_id,
      name: name,
      description: description,
      category: category,
      part: part,
      image: image,
    }

    handleAdd(form as AddWardrobe)
  }

  //---------------------------------------------------------
  //---------------------------------------------------------
  //---------------------------------------------------------
  //Rendering
  //---------------------------------------------------------

  return (
    <div className='flex flex-col items-center mt-[100px] '>
          <h2 className="font-bold text-[30px]">Add new item</h2>
      <form onSubmit={handleSubmit} className="w-[300px] lg:w-[600px] space-y-4 p-8 border-4 border-orange rounded-md mt-[50px]">
        <div className="space-y-2">
          <label className="font-semibold" htmlFor="item">Item *</label>
          <input className="text-black border-2 h-[40px] w-full rounded-md p-4 text-xl outline-orange" type="text" name="name" id="item" required />
        </div>
        <div className="space-y-2">
          <label className="font-semibold"  htmlFor="description">Description *</label>
          <input className="text-black border-2 h-[40px] w-full rounded-md p-4 text-xl outline-orange" type="text" name="description" id="description" required />
        </div>
        <div className="space-y-2">
          <label className="font-semibold"  htmlFor="part">Part *</label>
          <input className="text-black border-2 h-[40px] w-full rounded-md p-4 text-xl outline-orange" type="text" name="part" id="part" required />
        </div>
        <div className="space-y-2">
          <label className="font-semibold"  htmlFor="image">Image *</label>
          <input className="text-black border-2 h-[40px] w-full rounded-md p-4 text-xl outline-orange" type="text" name="image" id="image" required />
        </div>
        <div className="space-y-1">
          <label className="font-semibold"  htmlFor="category">Category *</label>
          <input className="text-black border-2 h-[40px] w-full rounded-md p-4 text-xl outline-orange"
            type="text"
            name="category"
            id="category"
            required
          />
        </div>
        <div className="mx-auto text-center text-xl lg:text-2xl lg:h-[70px]">
          <Button>Add!</Button>
        </div>
      </form>
    </div>
  )
}

export default AddItem
