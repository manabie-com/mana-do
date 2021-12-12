import { TodoContextProvider } from "../src/store/contexts/todo"
import { Story } from "@storybook/react"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [
    (Story: Story) => (
      <TodoContextProvider>
        <Story />
      </TodoContextProvider>
    )
  ],
}