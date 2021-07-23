import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import ChatButtons from "./components/ChatButtons";
function App() {
  return (
    //router set for react-router-dom
    <Router>
      <div className="container">
        {/* This container is going to contain title/mainroom/text-input */}
        <div className="main-room">
          {/* Header component that appears across all the pages */}
          <Header name="Main Room" />

          <div className="chat">
            {/* switch that controls which components are shown based on what "room" the user is in */}
            {/* Since ChatBox and ChatButtons generate their content based on the props given to them we only need to send different props based on the page location, rather than displaying different components for each page*/}
            <Switch>
              <Route
                /* when on the home page it gives the ChatBox and chatButtons components correlating props */
                exact
                path="/"
                component={() => {
                  return (
                    <div>
                      <ChatBox chatName="messages" />
                      <ChatButtons btnName="home" />
                    </div>
                  );
                }}
              />
              <Route
                /* when on the pets page the components are displayed with the pets props */
                path="/rooms/pets"
                component={() => {
                  return (
                    <div>
                      <ChatBox chatName="pets" />
                      <ChatButtons btnName="pets" />
                    </div>
                  );
                }}
              />
              <Route
                /* when on the games page, the components are displayed with the games props */
                path="/rooms/games"
                component={() => {
                  return (
                    <div>
                      <ChatBox chatName="games" />
                      <ChatButtons btnName="games" />
                    </div>
                  );
                }}
              />
            </Switch>
          </div>
          <div className="buttons-flex">{/* <ChatButtons /> */}</div>
        </div>
        {/* div for our navigation links */}
        <div className="all-rooms">
          {/* Header with the all rooms prop */}
          <Header name="All Rooms" />
          <div className="rooms">
            {/* each navlink sends the user to a different "room*/}
            {/* active classname changes styling to let the user know what room they are in */}
            <NavLink activeClassName="active" exact to={"/"}>
              Home
            </NavLink>
            <NavLink activeClassName="active" to={"/rooms/pets"}>
              Pets
            </NavLink>
            <NavLink activeClassName="active" to={"/rooms/games"}>
              Games
            </NavLink>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
