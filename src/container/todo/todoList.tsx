import React from "react";
import { IDefaultProps } from "../../interfaces/IDefaultProps";
declare global {
  interface Window {
    __initialServerData__?: any;
  }
}

interface IProps {
  hello?: string;
}
const TodoList: IDefaultProps<IProps> = props => {
  let initialServerData;
  if (props.staticContext && props.staticContext.initialServerData) {
    initialServerData = props.staticContext.initialServerData.hello;
  } else {
    initialServerData = window ? window.__initialServerData__.hello : null;
  }
  return <div>TodoList{initialServerData}</div>;
};

TodoList.initialData = () => {
  return { hello: "ddd" };
};

export default TodoList;
