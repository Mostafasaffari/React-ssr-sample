import React from "react";
import { IDefaultProps } from "../../interfaces/IDefaultProps";
interface IProps {
  hello?: string;
}
const TodoList: IDefaultProps<IProps> = props => {
  return <div>TodoList{props.hello}</div>;
};

TodoList.initialData = () => {
  return { hello: "ddd" };
};

export default TodoList;
