import React from "react";
import { StaticRouter, Route } from "react-router-dom";
import Routes from "../../routes";
import "./style.scss";

interface IProps {
  request: Request;
  context: any;
}
const App: React.FC<IProps> = props => {
  return (
    <StaticRouter location={props.request.url} context={props.context}>
      <Route component={Routes} />
    </StaticRouter>
  );
};
export default App;
