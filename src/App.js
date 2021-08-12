import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
function App() {
  return (
    <div className="app">
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <Header />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
