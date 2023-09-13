import { Register, RegisterDraft } from '../../../models/Register'

interface Props {
  register?: Register
  handleSubmit: (register: Register | RegisterDraft) => void
}

function RegisterForm(props: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const nickName = formData.get('nickName') as string

    const form = {
      nickName: nickName,
    }
    props.handleSubmit(form)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="space-y-2">
          <label htmlFor="nickname">Nickname *</label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            required
            defaultValue={props.register?.nickName}
          />
        </div>

        <div className="mx-auto text-center">
          <button>Save</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
