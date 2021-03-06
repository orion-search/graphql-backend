import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import { client } from "./utils/apollo";
import GA from "./utils/analytics";
import { ThemeProvider } from "emotion-theming";
import { Global, css } from "@emotion/core";

import theme from "./styles";
import GlobalStyles from "./styles/global";
import App from "./App";
import { OrionDataProvider } from "./OrionData.context";

export const history = createBrowserHistory();

(async () => {
  render(
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Global
          styles={css`
            ${GlobalStyles}
          `}
        />
        <OrionDataProvider>
          <Router history={history}>
            {GA.init() && <GA.RouteTracker />}
            <App />
          </Router>
        </OrionDataProvider>
      </ThemeProvider>
    </ApolloProvider>,
    document.getElementById("root")
  );
})();
