import React from "react";
import { IDefaultProps } from "../../interfaces/IDefaultProps";

interface CustomWindow extends Window {
  __initialServerData__?: any;
}
interface IProps {
  hello?: string;
}
const TodoList: IDefaultProps<IProps> = props => {
  const windowL: CustomWindow =
    typeof window !== "undefined" ? window : undefined;
  let initialServerData;
  if (props.staticContext && props.staticContext.initialServerData) {
    initialServerData = props.staticContext.initialServerData.hello;
  } else {
    initialServerData = windowL ? windowL.__initialServerData__.hello : null;
  }
  return <div>TodoList{initialServerData}</div>;
};

TodoList.initialData = () => {
  return { hello: "ddd" };
};

export default TodoList;
