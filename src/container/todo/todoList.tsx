import React from "react";
import { IDefaultProps } from "../../interfaces/IDefaultProps";
import { getTodoList } from "../../services/todoApi";
interface IProps {
  todoList?: any;
}
const TodoList: IDefaultProps<IProps> = props => {
  console.log(props.todoList)
  return <div>TodoList{props.todoList.map(i => <p>{i.title}</p>)}</div>;
};

TodoList.initialData = async () => {
  const data = await getTodoList();
  return { todoList: data };
};

export default TodoList;
