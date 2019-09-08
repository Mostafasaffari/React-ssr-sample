import React from "react";
import { StaticRouter, Route } from "react-router-dom";
import Routes from "../../routes";
import "./style.scss";

interface IProps {
  request: Request;
}
const App: React.FC<IProps> = props => {
  return (
    <StaticRouter location={props.request.url}>
      <Route component={Routes} />
    </StaticRouter>
  );
};
export default App;
