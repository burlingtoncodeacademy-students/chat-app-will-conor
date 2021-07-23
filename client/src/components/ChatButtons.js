import { useState } from "react";

function ChatButtons(props) {
  //set up state for the submit button being disabled or enabled
  const [submitState, setSubmitState] = useState(false);
  //callback function to disable the submit button if the message is too long
  const textHandler = (evt) => {
    //checks the length of the message
    if (evt.target.value.length > 500) {
      //if its too long it sends an error message and disables the submit button
      window.alert(`Messages must be less than 500 characters`);
      setSubmitState(true);
    } else {
      //as soon as the message is below 500 characters the submit button is re-enabled
      setSubmitState(false);
    }
  };

  return (
    <div>
      {/* the form sends a post request based on the props passed to it */}
      <form action={`/create/message/${props.btnName}`} method="POST">
        {/* input for the author data */}
        <input type="text" name="author" placeholder="enter your username" />
        {/* input for the body of the message, on change it calls the text handler function to validate the length of the message */}
        <input
          type="text"
          name="body"
          placeholder="Enter your message here"
          onChange={textHandler}
        />
        {/* input for the form submission, is disabled if the message is too long */}
        <input type="submit" disabled={submitState} />
      </form>
    </div>
  );
}
export default ChatButtons;
