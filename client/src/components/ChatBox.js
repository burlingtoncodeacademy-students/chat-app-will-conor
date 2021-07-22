import React from "react";
import { useState, useEffect, useInterval } from "react";

const ChatBox = (props) => {
  const [messageData, setMessageData] = useState([]);



  useEffect(() => {
    if (messageData.length === 0) {
        fetch(`/${props.chatName}`)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setMessageData(result);
          });
      }
      
      setInterval(()=>{
        if (messageData.length === 0) {
            fetch(`/${props.chatName}`)
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                setMessageData(result);
              });
          }
      }, 10000)
    
  }, [messageData]);

  return (
    <div className="chat-box">
      {messageData.map((message, index) => (
        <div className="message">
            <div className="author-flex">
          <h2>{message.when} --&nbsp;</h2>
          <h2>{message.author} :&nbsp;</h2>
          </div>
          <h2>&nbsp;{message.body}</h2>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;