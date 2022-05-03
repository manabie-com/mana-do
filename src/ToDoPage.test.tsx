import * as React from "react";
import { act } from "react-dom/test-utils";
import * as ReactDOM from "react-dom";
import TodoPage from "./ToDoPage";
import Service from "./service";
import { mount, shallow, ReactWrapper } from "enzyme";
import reducer, { AppState } from "./store/reducer";
import { Todo, TodoStatus } from "./models/todo";
import shortid from "shortid";

describe("Test ToDoPage", function () {
  it("Add New To do", async () => {
    let instance: any;
    let input: any;
    jest.spyOn(Service, "createTodo").mockImplementation((content) =>
      Promise.resolve({
        content: content,
        created_date: new Date().toISOString(),
        id: shortid(),
        status: "ACTIVE",
        user_id: "firstUser",
      })
    );
    await act(async () => {
      instance = mount(<TodoPage />);
      input = instance.find("input");
      // Tạo một todo item với content là Read React ne
      input.getDOMNode().value = "Read React ne";
      input.simulate("keydown", { key: "Enter" });
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra list do do gồm bao nhiêu item (1)
    expect(instance.find(".ToDo__item")).toHaveLength(1);

    await act(async () => {
      // Tạo một todo item với content là Read JavaScript ne
      input.getDOMNode().value = "Read JavaScript ne";
      input.simulate("keydown", { key: "Enter" });
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra list do do gồm bao nhiêu item (2)
    expect(instance.find(".ToDo__item")).toHaveLength(2);
  });
  it("Update item status", async () => {
    let instance: any;
    let input: any;
    jest.spyOn(Service, "createTodo").mockImplementation((content) =>
      Promise.resolve({
        content: content,
        created_date: new Date().toISOString(),
        id: shortid(),
        status: "ACTIVE",
        user_id: "firstUser",
      })
    );
    await act(async () => {
      instance = mount(<TodoPage />);
      input = instance.find("input");

      // Tạo một todo item với content là Read React ne
      input.getDOMNode().value = "Read React ne";
      input.simulate("keydown", { key: "Enter" });
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra thuộc tính checked (false).
    expect(instance.find({ type: "checkbox" }).at(0).props().checked).toEqual(
      false
    );

    // Update giá trị của checked sang true
    instance
      .find({ type: "checkbox" })
      .at(0)
      .simulate("change", { target: { checked: true } });

    // Cập nhật state
    instance.update();

    // Kiểm tra thuộc tính checked (true).
    expect(instance.find({ type: "checkbox" }).at(0).props().checked).toEqual(
      true
    );
  });
  it("Delete to do", async () => {
    let instance: any;
    let input: any;
    jest.spyOn(Service, "createTodo").mockImplementation((content) =>
      Promise.resolve({
        content: content,
        created_date: new Date().toISOString(),
        id: shortid(),
        status: "ACTIVE",
        user_id: "firstUser",
      })
    );
    await act(async () => {
      instance = mount(<TodoPage />);
      input = instance.find("input");

      input.getDOMNode().value = "Read JavaScript ne";
      input.simulate("keydown", { key: "Enter" });
    });

    //Cập nhật state
    instance.update();

    // Kiểm tra list do do gồm bao nhiêu item (1)
    expect(instance.find(".ToDo__item")).toHaveLength(1);

    await act(async () => {
      // Cập nhật tất cả các trạng thái todo sang ACTIVE
      instance.find(".Todo__delete").at(0).simulate("click");
    });

    //Cập nhật state
    instance.update();

    expect(instance.find(".ToDo__item")).toHaveLength(0);
  });
  it("Toogle All to do status", async () => {
    let instance: any;
    let input: any;
    jest.spyOn(Service, "createTodo").mockImplementation((content) =>
      Promise.resolve({
        content: content,
        created_date: new Date().toISOString(),
        id: shortid(),
        status: "ACTIVE",
        user_id: "firstUser",
      })
    );
    await act(async () => {
      instance = mount(<TodoPage />);
      input = instance.find("input");
      // Tạo một todo item với content là Read React ne
      input.getDOMNode().value = "Read React ne";
      input.simulate("keydown", { key: "Enter" });
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra list do do gồm bao nhiêu item (1)
    expect(instance.find(".ToDo__item")).toHaveLength(1);

    await act(async () => {
      // Tạo một todo item với content là Read JavaScript ne
      input.getDOMNode().value = "Read JavaScript ne";
      input.simulate("keydown", { key: "Enter" });
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra list do do gồm bao nhiêu item (2)
    expect(instance.find(".ToDo__item")).toHaveLength(2);

    // Kiểm tra tất cả checked (fasle)
    expect(instance.find({ type: "checkbox" }).at(0).props().checked).toEqual(
      false
    );
    expect(instance.find({ type: "checkbox" }).at(1).props().checked).toEqual(
      false
    );
    await act(async () => {
      // Cập nhật tất cả các trạng thái todo sang COMPLETE
      instance.find(".Action__btn").at(2).simulate("click");
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra tất cả checked (true)
    expect(instance.find({ type: "checkbox" }).at(0).props().checked).toEqual(
      true
    );
    expect(instance.find({ type: "checkbox" }).at(1).props().checked).toEqual(
      true
    );

    await act(async () => {
      // Cập nhật tất cả các trạng thái todo sang ACTIVE
      instance.find(".Action__btn").at(1).simulate("click");
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra tất cả checked (fasle)
    expect(instance.find({ type: "checkbox" }).at(0).props().checked).toEqual(
      false
    );
    expect(instance.find({ type: "checkbox" }).at(1).props().checked).toEqual(
      false
    );
  });
  it("Delete all to do", async () => {
    let instance: any;
    let input: any;
    jest.spyOn(Service, "createTodo").mockImplementation((content) =>
      Promise.resolve({
        content: content,
        created_date: new Date().toISOString(),
        id: shortid(),
        status: "ACTIVE",
        user_id: "firstUser",
      })
    );
    await act(async () => {
      instance = mount(<TodoPage />);
      input = instance.find("input");
      // Tạo một todo item với content là Read React ne
      input.getDOMNode().value = "Read React ne";
      input.simulate("keydown", { key: "Enter" });
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra list do do gồm bao nhiêu item (1)
    expect(instance.find(".ToDo__item")).toHaveLength(1);

    await act(async () => {
      // Tạo một todo item với content là Read JavaScript ne
      input.getDOMNode().value = "Read JavaScript ne";
      input.simulate("keydown", { key: "Enter" });
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra list do do gồm bao nhiêu item (2)
    expect(instance.find(".ToDo__item")).toHaveLength(2);

    await act(async () => {
      // Cập nhật tất cả các trạng thái todo sang ACTIVE
      instance.find(".Action__btn").at(3).simulate("click");
    });

    // Cập nhật state
    instance.update();

    // Kiểm tra list do do gồm bao nhiêu item (2)
    expect(instance.find(".ToDo__item")).toHaveLength(0);
  });
});
