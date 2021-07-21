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
          <header>
            <Header></Header>
          </header>
          <div className="chat">
            <ChatBox />
          </div>
          <div className="buttons-flex">
            <ChatButtons />
          </div>
        </div>

        <div className="all-rooms">
          <div className="rooms">
            <Link to={"rooms/pets"}>Pets</Link>
            <Link to={"rooms/games"}>Games</Link>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
