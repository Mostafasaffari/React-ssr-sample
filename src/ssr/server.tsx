import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../container/app/server";
interface IOptions {
  request: any;
}
export default async function ssr(options: IOptions) {
  return ReactDOMServer.renderToNodeStream(<App request={options.request} />);
}
