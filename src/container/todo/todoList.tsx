import React from "react";
import { IDefaultProps } from "../../interfaces/IDefaultProps";

interface IProps {
  hello?: string;
}
const TodoList: IDefaultProps<IProps> = props => {
  let initialServerData;
  if (props.staticContext && props.staticContext.initialServerData) {
    initialServerData = props.staticContext.initialServerData.hello;
  } else {
    initialServerData =
      typeof window !== "undefined" ? window.__initialServerData__.hello : null;
  }
  console.log(initialServerData);
  return <div>TodoList{initialServerData}</div>;
};

TodoList.initialData = () => {
  return { hello: "ddd" };
};

export default TodoList;
