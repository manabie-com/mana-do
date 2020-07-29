export interface SignInRequest {
  email: string
  password: string
}

export type Gender = 'Male' | 'Female' | 'Other'

export interface SignUpRequest {
  firstName: string
  lastName: string
  gender: Gender
  email: string
  password: string
}