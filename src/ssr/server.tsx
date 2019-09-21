import React from "react";
import { matchPath } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { routeList } from "../routes";
import App from "../container/app/server";
interface IOptions {
  request: any;
}
export default async function ssr(options: IOptions) {
  const currentRoute = routeList.find(route =>
    Boolean(matchPath(encodeURI(options.request.url), route))
  );
  const requestInitialDate =
    currentRoute &&
    currentRoute.component &&
    currentRoute.component.initialData &&
    currentRoute.component.initialData();

  const initialServerData = requestInitialDate
    ? await Promise.resolve(requestInitialDate)
    : [];
  const context = { initialServerData };
  return ReactDOMServer.renderToNodeStream(
    <App request={options.request} context={context} />
  );
}
