import "./Chat.scss";
import uuid from 'react-uuid'
import React, {useState,useEffect} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import moment from 'moment'


const Chat = (props) => {

  // console.log(props.chatData)
  
 
  
  var Chats=[];
  
  props.chatData.forEach((chatObj)=>{
if(chatObj.textedUserEmail===props.selectedUser.email || chatObj.receivedUserEmail===props.selectedUser.email)
   Chats.push(chatObj);
   
})

    const mymail = JSON.parse(sessionStorage.getItem("User")).email;
    // console.log(Chats);
    

    return (


        <ScrollToBottom className="chat-section">
            
      {Chats.map((chatObj,index) => {
        return <div
          key={index}
          className={`chat ${chatObj.textedUserEmail === mymail ? "me" : "you"}`}
        >
          
            <span className="name">{chatObj.textedUserName}</span>
         
          <p className="msg">{chatObj.Message}</p>
          <span className="time">{moment(chatObj.time).format("ddd")} , {moment(chatObj.time).format("LT")}</span>
        </div>;
      })}
   
                

        </ScrollToBottom>


    )
};


export default Chat;

