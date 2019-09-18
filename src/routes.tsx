import React from "react";
import { Route, Switch } from "react-router-dom";
import TodoList from "./container/todo/todoList";

interface IProps {}
const Routes: React.FC<IProps> = () => {
  const routes = [
    {
      path: "/",
      component: TodoList
    }
  ];
  return (
    <Switch>
      {routes.map(route => (
        <Route {...route} />
      ))}
      <Route component={() => <div>404 Not Found!!</div>} />
    </Switch>
  );
};
export default Routes;
