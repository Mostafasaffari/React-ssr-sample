import React from "react";

import { IDefaultProps } from "../../interfaces/IDefaultProps";
import { Todo } from "../../entities/todo";

import { getTodoList } from "../../services/todoApi";
interface IProps {
  todoList?: Todo[];
}
const TodoList: IDefaultProps<IProps> = props => {
  return <div>TodoList{props.todoList.map(i => <p>{i.title}</p>)}</div>;
};

TodoList.initialData = async () => {
  const data: Todo[] = await getTodoList();
  return { todoList: data };
};

export default TodoList;
