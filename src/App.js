import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import About from "./views/About";
import AllPlayer from "./views/AllPlayer";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigation>
              <Home />
            </Navigation>
          }
        />

        <Route
          path="/home"
          element={
            <Navigation>
              <Home />
            </Navigation>
          }
        />

        <Route
          path="/about"
          element={
            <Navigation>
              <About />
            </Navigation>
          }
        />

        <Route
          path="/player"
          element={
            <Navigation>
              <AllPlayer />
            </Navigation>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
