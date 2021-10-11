import { Todos } from "./../models/todos";
import { ListResponse } from "../models";
import axiosClient from "../utils/axios";
const todosAPI = {
  // Server respon client 1 array data, the objects in this data array include the Todos properties
  getAll(): Promise<ListResponse<Todos>> {
    const url = "/todos";
    return axiosClient.get(url);
  },
  // server respon object todos
  createTodos(data: Todos): Promise<Todos> {
    const url = "/todos";
    return axiosClient.post(url, data);
  },
  deleteTodos(id: string): Promise<Todos> {
    const url = `/todos/${id}`;
    return axiosClient.delete(url);
  },
  updateTodos(object: Todos): Promise<Todos> {
    const url = `/todos/${object.id}`;
    return axiosClient.put(url, object)
  }
};
export default todosAPI;
