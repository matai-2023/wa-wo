import { AddWardrobe } from '../../../types/MyWardrobe'
import Button from '../UI/Button/Button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation } from '@tanstack/react-query'
import { addItem, getUser } from '../../apis/api'

///////////////////////////////////////////////////////////
function AddItem() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  ////////////////////////////////////////////////////////////
  const mutationAdd = useMutation({
    mutationFn: ({ newItem, token }: { newItem: AddWardrobe; token: string }) =>
      addItem(newItem, token),
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })
  async function handleAdd(newItem: AddWardrobe) {
    const token = await getAccessTokenSilently()

    mutationAdd.mutate({ newItem, token })
    navigate('/my-wardrobe')
  }
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      const response = await getUser(token)
      console.log(response)
      return response
    },
  })

  //////////////////////////////////////////////////////////////////
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
  ///////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="space-y-2">
          <label htmlFor="item">Item *</label>
          <input type="text" name="name" id="item" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="description">Description *</label>
          <input type="text" name="description" id="description" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="part">Part *</label>
          <input type="text" name="part" id="part" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="image">Image *</label>
          <input type="text" name="image" id="image" required />
        </div>
        <div className="space-y-1">
          <label htmlFor="category">Category *</label>
          <input
            type="text"
            name="category"
            id="category"
            required
            placeholder="Category"
          />
        </div>
        <div className="mx-auto text-center">
          <Button>Add!</Button>
        </div>
      </form>
    </div>
  )
}

export default AddItem
