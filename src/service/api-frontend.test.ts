import Service from ".";

jest.mock("../service/api-frontend");

describe("Test Api Frontend function", () => {
  it("Should call createTodo with content parameter", () => {
    const mockContent = "test";
    jest.spyOn(Service, "createTodo").mockResolvedValueOnce(Promise);
    Service.createTodo(mockContent);

    expect(Service.createTodo).toBeCalledWith(mockContent);
  });

  it("Shoul call getTodos from localstorage", () => {
    const setItem = jest.spyOn(Storage.prototype, "setItem");
    const getItem = jest.spyOn(Storage.prototype, "getItem");

    localStorage.setItem("Todos", "test");
    localStorage.getItem("Todos");

    expect(setItem).toHaveBeenCalledWith("Todos", "test");
    expect(getItem).toHaveBeenCalledWith("Todos");
  });
});
