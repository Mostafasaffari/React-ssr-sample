import React from "react";
import { Route, Switch } from "react-router-dom";
import TodoList from "./container/todo/todoList";

const routeList = [
  {
    path: "/",
    component: TodoList
  }
];

interface IProps {}
const Routes: React.FC<IProps> = (props) => {
  return (
    <Switch>
      {routeList.map((route, i) => (
        <Route {...route} key={i} />
      ))}
      <Route component={() => <div>404 Not Found!!</div>} />
    </Switch>
  );
};
export default Routes;
export { routeList };
