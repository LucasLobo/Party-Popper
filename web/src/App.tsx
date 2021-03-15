import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Game from "./components/game/Game";
import LandingPage from "./pages/landingPage";
import "./assets/variables.css";

// import "./assets";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
