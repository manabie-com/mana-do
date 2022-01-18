import { ApiResponse } from "../service/types"

// Local storage key
export const STORAGE_TODO_LIST = 'todo-list'
export const STORAGE_TOKEN = 'token'

// Object
export const successResponse: ApiResponse = {
  success: true,
  message: 'Successfully!'
}

export const failedResponse: ApiResponse = {
  success: false,
  message: 'Failed!'
}