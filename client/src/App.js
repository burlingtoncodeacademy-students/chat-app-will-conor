import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import ChatButtons from "./components/ChatButtons";
function App() {
  return (
    <Router>
      <div className="container">
        {/* This container is going to contain title/mainroom/text-input */}
        <div className="main-room">
          <Header name="Main Room" />

          <div className="chat">
            <Switch>
              <Route
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
          <div className="buttons-flex">
            {/* <ChatButtons /> */}
          </div>
        </div>

        <div className="all-rooms">
          <Header name="All Rooms" />
          <div className="rooms">
            <Link to={"/"}>Home</Link>
            <Link to={"/rooms/pets"}>Pets</Link>
            <Link to={"/rooms/games"}>Games</Link>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
