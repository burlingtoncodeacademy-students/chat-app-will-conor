//importing react and the things we need from react
import React from "react";
import { useState, useEffect, useRef } from "react";
//se up hook for the chatbox component
const ChatBox = (props) => {
  //set up state for our message data
  const [messageData, setMessageData] = useState([]);
  //set up state for whether or not the chatbox is scrolled to the bottom
  const [isBottom, setIsBottom] = useState(true);
  //use effect that fetches the data for the messages when the page is loaded
  useEffect(() => {
    //checks that there are no messages, so it doesn't just fetch until the heat death of the universe
    if (messageData.length === 0) {
      //fetches data from a a different collection based on the prop sent to it
      fetch(`/${props.chatName}`)
        .then((response) => response.json())
        .then((result) => {
          //sets the messageData state to be the result of the fetch
          setMessageData(result);
        });
    }
    //sets up an interval to check for new messages that have been sent since the page first loaded
    setInterval(() => {
      if (messageData.length === 0) {
        fetch(`/${props.chatName}`)
          .then((response) => response.json())
          .then((result) => {
            //sets the messageData state to be the result of the new fetch
            setMessageData(result);
          });
      }
      //interval is set up to fetch every 10 seconds
    }, 10000);
    clearInterval();
  }, [messageData]);
  //callback function to handing the scrolling of the chatbox
  const handleScroll = (evt) => {
    //sets up a var that compares the height of the chatbox to the height of the client, so it knows where the bottom of the chatbox actually is
    let bottom =
      evt.target.scrollHeight - evt.target.scrollTop ===
      evt.target.clientHeight;
    //if the chatbox is already at the bottom, it sets the IsBottom state to true
    if (bottom) {
      setIsBottom(true);
      //If the chatbox isn't at the bottom it sets it to false
    } else {
      setIsBottom(false);
    }
  };
  //set up a useref to target the empty div at the bottom of the chatbox
  const messageEnd = useRef(null);
  //callback function to scroll to the bottom of the chatbox
  const scrollBottom = () => {
    //scrolls the empty div into view when the function is called. Effectively scrolling to the bottom of the chatbox
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  };
  //useEffect that checks the value of the IsBottom state
  useEffect(() => {
    //if the state is true, it calls the state and scrolls the user to the bottom of the chatbox, showing the new message in the process
    if (isBottom) {
      scrollBottom();
      console.log(`bottom`);
      //otherwise it keeps the user where they are, allowing them to read old messages without getting sent to the bottom every few seconds
    } else {
      console.log("not bottom");
    }
  }, [messageData]);

  return (
    //container div with an onScroll that calls our handleScroll function
    <div className="chat-box" onScroll={handleScroll}>
      {/* maps over the fetched messageData and turns the data into html elements that can be shown on the screen */}
      {messageData.map((message, index) => (
        //container div for the message, uses the index as it's unique key
        <div key={index} className="message">
          {/* div that contains the time and author info */}
          <div className="author-flex">
            {/* force blank spaces to make it look better */}
            <h2>{message.when} --&nbsp;</h2>
            <h2>{message.author} :&nbsp;</h2>
          </div>
          {/* dive containing the actual text of the message */}
          <h2>&nbsp;{message.body}</h2>
        </div>
      ))}
      {/* empty div that our scroll function refrences to scroll to the bottom of the page */}
      <div ref={messageEnd}></div>
    </div>
  );
};

export default ChatBox;
