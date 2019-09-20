import React from "react";
import { IDefaultProps } from "../../interfaces/IDefaultProps";

interface IProps {
  hello?: string;
}
const TodoList: IDefaultProps<IProps> = props => {
  console.log(props.hello);
  return <div>TodoList</div>;
};

TodoList.initialData = () => {
  return { hello: "ddd" };
};

export default TodoList;
