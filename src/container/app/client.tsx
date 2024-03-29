import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Routes from "../../routes";
import "./style.scss";
import "../../helpers/listFunction";

interface IProps {}
const App: React.FC<IProps> = props => {
  return (
    <BrowserRouter>
      <Route component={Routes} />
    </BrowserRouter>
  );
};
export default App;
