import React from "react";
import { Route, Switch } from "react-router-dom";
import TodoList from "./container/todo/todoList";
declare global {
  interface Window {
    __initialServerData__?: any;
  }
}

const routeList = [
  {
    path: "/",
    component: TodoList
  }
];

interface IProps {
  staticContext?: any;
}
const Routes: React.FC<IProps> = props => {
  let initialServerData;
  if (props.staticContext && props.staticContext.initialServerData) {
    initialServerData = props.staticContext.initialServerData;
  } else {
    initialServerData = window ? window.__initialServerData__ : null;
  }
  return (
    <Switch>
      {routeList.map((route, i) => {
        const { component: Component } = route;
        return (
          <Route
            path={route.path}
            component={() => <Component {...initialServerData} />}
            key={i}
          />
        );
      })}
      <Route component={() => <div>404 Not Found!!</div>} />
    </Switch>
  );
};
export default Routes;
export { routeList };
