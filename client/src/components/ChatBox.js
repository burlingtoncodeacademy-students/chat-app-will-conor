import React from 'react'
import {useState, useEffect} from 'react'

const ChatBox = ()=> {
    const [messageData, setMessageData] = useState([])
    
   
    useEffect(()=>{
        
        if(messageData.length === 0){
        fetch('/messages')
        .then((response) =>response.json())
        .then((result) =>{
            console.log(result)
            setMessageData(result)
        })
        }
    }, [messageData])

   
   

    return(
        
        <div className="chat-box">{messageData.map((message, index) => (
            <div className="message">
                <h2>{message.author}:</h2>
            <h2>{message.when}</h2>
            <h2>{message.body}</h2>
            
            </div>
        ))}
            
         
        </div>
    )
}

export default ChatBox  