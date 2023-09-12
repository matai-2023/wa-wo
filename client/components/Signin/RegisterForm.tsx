import { Register, RegisterDraft } from '../../../models/Register'

interface Props {
  register?: Register
  handleSubmit: (register: Register | RegisterDraft) => void
}

function RegisterForm(props: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const nickName = formData.get('nickName') as string

    const form = {
      firstName: firstName,
      lastName: lastName,
      nickName: nickName,
    }
    props.handleSubmit(form)
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div className="space-y-2">
          <label htmlFor="nickname">Nickname *</label>
          <TextBox
            type="text"
            name="nickname"
            id="nickname"
            required
            defaultValue={props.register?.nickname}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="first-name">First Name *</label>
          <TextBox
            type="text"
            name="firstName"
            id="first-name"
            required
            defaultValue={props.register?.firstName}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="last-name">Last Name</label>
          <TextBox
            type="text"
            name="lastName"
            id="last-name"
            defaultValue={props.register?.lastName}
          />
        </div>

        <div className="mx-auto text-center">
          <Button>Save</Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
