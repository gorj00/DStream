import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App"

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";

const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/subgraphs/name/dstream/ethereum-graph',
  cache: new InMemoryCache(),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
