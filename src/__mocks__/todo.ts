import { TodoStatus } from '@/models/todo'
import { EnhanceTodoStatus } from '@/pages/todo'

export const stateProvider = {
  todos: [
    {
      content: 'Meet some cute peoples at Manabie',
      created_date: '',
      status: TodoStatus.ACTIVE,
      id: '_1',
      user_id: 'aldenn'
    },
    {
      content: 'Work with Manabie',
      created_date: '',
      status: TodoStatus.ACTIVE,
      id: '_2',
      user_id: 'aldenn'
    },
    {
      content: 'Complete the test for todo app',
      created_date: '',
      status: TodoStatus.COMPLETED,
      id: '_3',
      user_id: 'aldenn'
    }
  ]
}

export const statusesFilterProvider: {
  description: string
  status: EnhanceTodoStatus
  numOfRecord: number
}[] = [
  {
    description: 'The number of active todo',
    status: TodoStatus.ACTIVE,
    numOfRecord: 2
  },
  {
    description: 'The number of completed todo',
    status: TodoStatus.COMPLETED,
    numOfRecord: 1
  },
  {
    description: 'All of todo item',
    status: 'ALL',
    numOfRecord: 3
  }
]

export const emptyLabelByStatusProvider: {
  description: string
  status: EnhanceTodoStatus
  label: string
}[] = [
  {
    description:
      "The empty label for ACTIVE status should be Nothing need to do, let's relax",
    status: TodoStatus.ACTIVE,
    label: "Nothing need to do, let's relax"
  },
  {
    description:
      'The empty label for COMPLETED status should be Nothing is completed',
    status: TodoStatus.COMPLETED,
    label: 'Nothing is completed'
  },
  {
    description:
      'The empty label for ALL status should be Type something into the input and Enter',
    status: 'ALL',
    label: 'Type something into the input and Enter'
  }
]
