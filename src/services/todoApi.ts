import axios from "axios";
import { Todo } from "../entities/todo";

axios.defaults.baseURL = "http://localhost:3000/";

const getTodoList = async (): Promise<Todo[]> => {
  const response = await axios.get("/todos");
  return response.data;
};

const updateTodoName_api = async (id: string, obj: Todo): Promise<Todo> => {
  const response = await axios.put(`todos/${id}`, { ...obj });
  return response.data;
};

export { getTodoList, updateTodoName_api };
