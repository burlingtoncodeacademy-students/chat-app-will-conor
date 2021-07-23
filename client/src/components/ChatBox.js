import React from "react";
import { useState, useEffect, useRef } from "react";

const ChatBox = (props) => {
  const [messageData, setMessageData] = useState([]);
 const [isBottom, setIsBottom] = useState(true)

  useEffect(() => {
    if (messageData.length === 0) {
        fetch(`/${props.chatName}`)
          .then((response) => response.json())
          .then((result) => {
            
            setMessageData(result);
          });
      }

      setInterval(()=>{
        if (messageData.length === 0) {
            fetch(`/${props.chatName}`)
              .then((response) => response.json())
              .then((result) => {
               
                setMessageData(result);
              });
          }
      }, 10000)
    clearInterval()
  }, [messageData]);

  const handleScroll = (evt) => {
    let bottom = evt.target.scrollHeight - evt.target.scrollTop === evt.target.clientHeight
    if(bottom) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  }

  const messageEnd = useRef(null)
  const [scrollHeight, setScrollHeight] = useState(null)

  const scrollBottom = () =>{
    
      messageEnd.current?.scrollIntoView({behavior: 'smooth'})
    
    
  }

  useEffect(()=>{
    if(isBottom){
      scrollBottom()
      console.log(`bottom`)
    } else {
      console.log('not bottom')
    }
      
  }, [messageData])

  return (
    <div className="chat-box" onScroll={handleScroll}> 
      {messageData.map((message, index) => (
        <div key={index} className="message">
            <div className="author-flex">
          <h2>{message.when} --&nbsp;</h2>
          <h2>{message.author} :&nbsp;</h2>
          </div>
          <h2>&nbsp;{message.body}</h2>
        </div>
      ))}
      <div ref={messageEnd}></div>
    </div>
  );
};

export default ChatBox;
