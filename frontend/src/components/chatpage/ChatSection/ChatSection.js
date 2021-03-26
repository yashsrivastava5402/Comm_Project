import io from 'socket.io-client';
import ChatHeader from "./../ChatHeader/ChatHeader";

import Chat from "./../Chat/Chat";
import ChatForm from "./../ChatForm/ChatForm";
import React, {useRef,useEffect} from 'react'


const ChatSection = (props) => {
  
console.log(props.chatData)
	// const onTextChange = (e) => {
	// 	setState({ ...state, [e.target.name]: e.target.value })
	// }

	// const onMessageSubmit = (e) => {
		
	// 	socketRef.current.emit("sendmsg", chatObj)
	// 	e.preventDefault()

	// }
  

  return (
    <>
      <ChatHeader {...props}/>
      <Chat {...props} />
      <ChatForm {...props}/>
    </>
  );
};

export default ChatSection;
