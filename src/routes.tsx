import React from "react";
import { Route, Switch } from "react-router-dom";

interface IProps {}
const Routes: React.FC<IProps> = () => {
  const routes = [
    {
      path: "/",
      component: () => <div>Hello SSR</div>
    }
  ];
  return (
    <Switch>
      {routes.map(route => (
        <Route {...route} />
      ))}
    </Switch>
  );
};
export default Routes;
