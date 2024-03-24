import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./High Order Function/Layout";
import "./css/main.css";
import { Provider } from "react-redux";
import Store from "./Store";
import "./App.css";
import { ContextProvider } from "./reducer/ContextProvide";
import { useEffect } from "react";

const App = () => {
  return (
    <Provider store={Store}>
      <ContextProvider>
        <Router>
          <Layout/>
        </Router>
      </ContextProvider>
    </Provider>
  )
}

export default App