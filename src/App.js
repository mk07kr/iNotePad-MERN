import React from "react";
import { Router ,Switch,Route} from "react-router-dom";
import About from "./components/about";
import Home from "./components/home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
