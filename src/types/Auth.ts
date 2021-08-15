export interface Credential {
  userLogin: string
  userPassword: string
}

export interface AuthResponse {
  accessToken: string
}

export interface Response {
  id?: number
  userLogin?: string
  displayName?: string
  meta?: {
    isAdmin: boolean
    role: string
    live: boolean
  }
}

export interface Register {
  userLogin: string
  userPassword: string
  displayName: string
  meta: {
    isAdmin: boolean
    role: string
    live: boolean
  }
}
