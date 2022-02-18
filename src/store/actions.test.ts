import { setTodos } from "./actions";

test("test set Todo", () => {
    expect(setTodos([])).toHaveProperty('type')
    expect(setTodos([])).toHaveProperty('payload')
})