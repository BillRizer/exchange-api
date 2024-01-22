interface UserProps {
  id: number
  name: string
  email: string
  password: string
  balance: number
}

export default class User {
  id?: number
  name: string
  email: string
  password: string
  balance: number

  constructor(props: UserProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.balance = props.balance
  }
}
