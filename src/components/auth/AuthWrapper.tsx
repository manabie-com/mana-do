import { mockToken } from '../../service/api-frontend'
import {useHistory} from 'react-router-dom'

interface Props {
  children: any
}

const AuthWrapper = ({ children }: Props) => {
  const history = useHistory()
  const getToken = localStorage.getItem("token")

  if (getToken !== mockToken) {
    history.push('/')
  }

  return children
}

export default AuthWrapper