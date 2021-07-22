function ChatButtons(props) {
  return (
    <div>
      <form  action="/create/message/games"  method="POST">
        <input type="text" name="author" placeholder="enter your username" />
        <input type="text" name="body" placeholder="Enter your message here" />
        <input type="submit"  />
      </form>
    </div>
  );
}
export default ChatButtons;
