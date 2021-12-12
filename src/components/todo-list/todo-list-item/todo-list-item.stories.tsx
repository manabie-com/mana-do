import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import TodoListItem from '.'
import { TodoStatus } from '../../../models/todo'
import { within, userEvent } from '@storybook/testing-library'
import { expect, jest } from '@storybook/jest'

export default {
  component: TodoListItem
} as ComponentMeta<typeof TodoListItem>

const Template: ComponentStory<typeof TodoListItem> = (args) => <TodoListItem {...args} />

export const Default = Template.bind({})

Default.args = {
  todo: {
    id: "todo1",
    content: "Todo 1",
    status: TodoStatus.ACTIVE,
    user_id: "user1",
    created_date: ""
  },
  handleUpdateTodo: jest.fn(),
  handleDeleteTodo: jest.fn()
}

export const Completed = Template.bind({})

Completed.args = {
  ...Default.args,
  todo: {
    ...Default.args.todo!,
    status: TodoStatus.COMPLETED
  }
}

export const Editing = Template.bind({})

Editing.args = {
  ...Default.args
}

Editing.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  userEvent.dblClick(canvas.getByText('Todo 1'))
}

export const Edited = Template.bind({})

Edited.args = {
  ...Default.args
}

Edited.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  userEvent.dblClick(canvas.getByText('Todo 1'))
  userEvent.type(canvas.getByRole('textbox'), '{enter}')
  expect(Editing.args?.handleUpdateTodo).toHaveBeenCalled()
}

export const Delete = Template.bind({})

Delete.args = {
  ...Default.args
}

Delete.play = ({ canvasElement }) => {
  const canvas = within(canvasElement)
  userEvent.click(canvas.getByRole('button'))
  expect(Delete.args?.handleDeleteTodo).toHaveBeenCalled()
}
