import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Router from "./Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
