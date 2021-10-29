import { Todo, TodoStatus } from "models/todo";
export const mockTodos: Todo[] = [
  {
    content: "tesing 1",
    created_date: "2021-10-28T07:28:01.065Z",
    status: TodoStatus.COMPLETED,
    id: "IOJj_prN0",
    user_id: "firstUser",
  },
  {
    content: "testing 2",
    created_date: "2021-10-28T07:28:02.929Z",
    status: TodoStatus.ACTIVE,
    id: "JqnFcE-IO",
    user_id: "firstUser",
  },
  {
    content: "testing 3",
    created_date: "2021-10-28T07:28:04.866Z",
    status: TodoStatus.ACTIVE,
    id: "UT6Nvn9EZ",
    user_id: "firstUser",
  },
  {
    content: "testing 4",
    created_date: "2021-10-28T07:28:06.770Z",
    status: TodoStatus.COMPLETED,
    id: "mshueknyx",
    user_id: "firstUser",
  },
  {
    content: "testing 5",
    created_date: "2021-10-28T07:28:10.993Z",
    status: TodoStatus.ACTIVE,
    id: "M1yXwjGDO",
    user_id: "firstUser",
  },
  {
    content: "testing 6",
    created_date: "2021-10-28T07:28:13.513Z",
    status: TodoStatus.COMPLETED,
    id: "fy0n1l9vQ",
    user_id: "firstUser",
  },
  {
    content: "testing 7",
    created_date: "2021-10-28T07:28:15.537Z",
    status: TodoStatus.ACTIVE,
    id: "P2YnDzQTH",
    user_id: "firstUser",
  },
  {
    content: "testing 8",
    created_date: "2021-10-28T07:28:17.945Z",
    status: TodoStatus.ACTIVE,
    id: "5NZqPEpPH",
    user_id: "firstUser",
  },
  {
    content: "testing 9",
    created_date: "2021-10-28T07:28:19.937Z",
    status: TodoStatus.COMPLETED,
    id: "OTIcLJzqx",
    user_id: "firstUser",
  },
  {
    content: "testing 10",
    created_date: "2021-10-28T07:28:21.962Z",
    status: TodoStatus.ACTIVE,
    id: "J0a2UErKe",
    user_id: "firstUser",
  },
];

export const mockNewSingleTodo: Todo = {
  content: "testing 11",
  created_date: "2021-10-28T07:30:02.385Z",
  status: TodoStatus.ACTIVE,
  id: "45rRG0vKY",
  user_id: "firstUser",
};

export const mockUpdatedSingleTodo: Todo = {
  content: "testing 99",
  created_date: "2021-10-28T07:28:19.937Z",
  status: TodoStatus.ACTIVE,
  id: "OTIcLJzqx",
  user_id: "firstUser",
};
