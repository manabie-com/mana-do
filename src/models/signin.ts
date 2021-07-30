import TextInput from 'root/components/commons/fields/textInput'
import { updateUsername, updatePassword } from 'root/store/actions/signin.actions'

export enum signinKeys {
  userId = 'userId',
  password = 'password'
}

export type SigninFieldName = typeof signinKeys.userId
  | typeof signinKeys.password

const text = {
  userId: 'User ID',
  password: 'Password'
}

const signInModel = {
  [signinKeys.userId]: {
    component: TextInput,
    validate: [],
    name: signinKeys.userId,
    actionUpdate: updateUsername,
    label: text.userId,
  },
  [signinKeys.password]: {
    component: TextInput,
    validate: [],
    name: signinKeys.password,
    actionUpdate: updatePassword,
    label: text.password,
    inputType: 'password'
  }
}

export default signInModel