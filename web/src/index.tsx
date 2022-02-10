import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import "./index.css";
import { VisibilityProvider } from "./providers/VisibilityProvider";

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
        <RecoilRoot>
          <ChakraProvider theme={theme}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <App />
            </React.Suspense>
          </ChakraProvider>
        </RecoilRoot>
      </VisibilityProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
