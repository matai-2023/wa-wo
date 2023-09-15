import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import useAddItem from '../../hooks/useAddItem'
import { AddWardrobe } from '../../../types/MyWardrobe'

function AddPage() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const usemutation = useAddItem()

  async function handleSubmit(newItem: AddWardrobe) {
    const token = await getAccessTokenSilently()
    usemutation.mutate({ newItem, token })
    navigate('/my-wardrobe')
  }

  return (
    <>
      <AddPage handleSubmit={() => handleSubmit} />
    </>
  )
}

export default AddPage
