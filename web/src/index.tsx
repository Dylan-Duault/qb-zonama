import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { VisibilityProvider } from "./providers/VisibilityProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        track: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        backgroundColor: "transparent",
      },
    }),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VisibilityProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </VisibilityProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
