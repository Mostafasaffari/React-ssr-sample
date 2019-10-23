import api from "./axios";
import { Todo } from "../entities/todo";

const getTodoList = async (): Promise<Todo[]> => {
  const response = await api.get("/todos");
  return response.data;
};

const updateTodoName_api = async (id: string, obj: Todo): Promise<Todo> => {
  const response = await api.put(`todos/${id}`, { ...obj });
  return response.data;
};

export { getTodoList, updateTodoName_api };
