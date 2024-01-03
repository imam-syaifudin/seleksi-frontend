import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Error from "./components/Error";
import About from "./views/About";
import AllPlayer from "./views/AllPlayer";
import Home from "./views/Home";
import Login from "./views/Login";
import Add from "./views/player/Add";
import Edit from "./views/player/Edit";
import Profile from "./views/Profile";
import View from "./views/player/View";

function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log("error");
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

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

        <Route
          path="/profile"
          element={
            <Navigation>
              <Profile />
            </Navigation>
          }
        />

        // Player Route 
        <Route
          path="/player/add"
          element={
            <Navigation>
              <Add />
            </Navigation>
          }
        />

        <Route
          path="/player/edit/:id"
          element={
            <Navigation>
              <Edit />
            </Navigation>
          }
        />

        <Route
          path="/player/view/:id"
          element={
            <Navigation>
              <View />
            </Navigation>
          }
        />

        <Route
          path="*"
          element={
            <Error/>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
