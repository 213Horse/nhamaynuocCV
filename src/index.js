import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import apolloClient from "./config/apolloClient";
// import apolloClientMongo from "./config/apolloClientmongo";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      token: {
        fontFamily: `Quicksand !important`,
      },
    }}
  >
    <GlobalStyles>
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          {/* <ApolloProvider client={apolloClientMongo}> */}
          <App />
          {/* </ApolloProvider> */}
        </ApolloProvider>
      </Provider>
    </GlobalStyles>
  </ConfigProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
