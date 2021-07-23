
import {useState} from 'react'

function ChatButtons(props) {


const[submitState, setSubmitState] = useState(false)
 const textHandler = (evt)=>{
  if(evt.target.value.length > 500){
    window.alert(`Message is too long`)
    setSubmitState(true)
  } else { 
    setSubmitState(false)
  }
 }


  return (
    <div>
      <form  action={`/create/message/${props.btnName}`}  method="POST">
        <input type="text" name="author" placeholder="enter your username" />
        <input type="text" name="body" placeholder="Enter your message here" onChange={textHandler} />
        
        <input type="submit" disabled={submitState} />
      </form>
    </div>
  );
}
export default ChatButtons;
