export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  image: string
}

export interface Login {
  email: string
  password: string
}