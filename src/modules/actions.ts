
export const types = {
  LOGIN: 'LOGIN' as const,
  LOGOUT: 'LOGOUT' as const,
}

export const login = (payload: string) => ({
  type: types.LOGIN,
  payload
})

export const logout = () => ({
  type: types.LOGOUT,
})

type Action = (
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
)

export default Action;