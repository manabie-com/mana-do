import Service from "../service";

it("Testing Create Todo Function", async function () {
  const data = await Service.createTodo("Todo_1");
  expect(data.content).toEqual("Todo_1");
});
it("Testing New feature Edit Todo ", async function () {
  const OLD_TODOS = localStorage.getItem('listTodos')  
  const LIST_TODO = [
    {
      content: "before edit",
      created_date: new Date().toISOString(),
      status: "ACTIVE",
      id: "123456",
      user_id: "firstUser",
    },
  ];
  localStorage.setItem("listTodos", JSON.stringify(LIST_TODO));
  const data = await Service.updateTodo("content", "After_Edit", "123456");
  localStorage.setItem("listTodos", OLD_TODOS);
  expect(data.content).toEqual("After_Edit");
});
it("Testing New feature Edit Todo ", async function () {
  const data = await Service.deleteAllTodo();
  expect(data).toEqual("200");
});
