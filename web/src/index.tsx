import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { VisibilityProvider } from "./providers/VisibilityProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";

import { RecoilRoot } from "recoil";

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
      <RecoilRoot>
        <VisibilityProvider>
          <ChakraProvider theme={theme}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <App />
            </React.Suspense>
          </ChakraProvider>
        </VisibilityProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
