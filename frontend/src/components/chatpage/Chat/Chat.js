import "./Chat.scss";
import uuid from 'react-uuid'
import React, {useState} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";


const Chat = (props) => {
  console.log(props.chatData);
let chatdata=[];
props.chatData.forEach((chatObj)=>{
if(chatObj.email1===props.selectedUser.email || chatObj.email2===props.selectedUser.email)
   chatdata.push(chatObj);
})

    const mymail = JSON.parse(sessionStorage.getItem("User")).email;

    return (


        <div className="chat-section">
            
      {chatdata.map((chatObj,index) => {
        return <div
          key={index}
          className={`chat ${chatObj.email1 === mymail ? "me" : "you"}`}
        >
          
            <span className="name">{chatObj.username1}</span>
         
          <p className="msg">{chatObj.Message}</p>
          <span className="time">{chatObj.time}</span>
        </div>;
      })}
   
                

        </div>


    )
};


export default Chat;

