import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import TodoList from '.'
import { TodoStatus } from '../../models/todo'

export default {
  component: TodoList
} as ComponentMeta<typeof TodoList>

const Template: ComponentStory<typeof TodoList> = (args) => <TodoList {...args} />

export const Default = Template.bind({})

Default.args = {
  todos: [
    {
      id: "todo1",
      content: "Todo 1",
      status: TodoStatus.ACTIVE,
      user_id: "user1",
      created_date: ""
    },
    {
      id: "todo2",
      content: "Todo 2",
      status: TodoStatus.COMPLETED,
      user_id: "user2",
      created_date: ""
    }
  ]
}
