import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuid from 'react-uuid'
import React,{useState} from 'react'

import MicIcon from '@material-ui/icons/Mic';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import "./ChatForm.scss";


const ChatForm =(props)=>{

  const curruser=JSON.parse(sessionStorage.getItem("User"));

  const handlesubmitform=(e)=>{
    e.preventDefault();
    if(message!='')
    {
      const msgObj={"Message":message,"email1":curruser.email,"email2":props.selectedUser.email,"username1":curruser.username,"username2":props.selectedUser.username,"time": Date.now()};
      console.log(msgObj);
      props.updateChat(msgObj);
      props.chatsocks(msgObj);
      setMessage('');
      
    }
    
    

  }
  const [message, setMessage] = useState('');

  



  return (
    <form onSubmit={handlesubmitform} action="submit">

        <div className="chat-form">
        <div className="action-bbtn">
        <InsertEmoticonIcon />
      
          <AttachFileIcon />
      
        </div>
        <input 
        className="chat-input"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />
        <MicIcon  />
      
        </div>
    </form>
    
  );
};

export default ChatForm;