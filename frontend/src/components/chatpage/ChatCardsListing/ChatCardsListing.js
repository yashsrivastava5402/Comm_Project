import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import moment from 'moment'

import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import "./ChatCardsListing.scss";
const ChatCardsListing = (props) => {
  // const [newuser, setnewuser] = useState("");

  // const [prevUsers, setprevUsers] = useState([]);

  let render=null;
  const [chatData, setchatData] = useState([]);
  const handleClick = async (Suser) => {
    setselectedUser(Suser);
     sessionStorage.setItem("selecteduser",JSON.stringify(Suser));
 
    axios
     .post("http://localhost:5000/findChat", {
       email1: JSON.parse(sessionStorage.getItem("User")).email,
       email2: Suser.email
     })
     .then((res) => {
       console.log("got response",res.data)
       setchatData(res.data);   
     })
     .catch((err) => {
       console.log(err);
     });
    
   
   
 };
 
  if((sessionStorage.getItem("search")==="true")  && (props.newuser === ""||props.newuser === null))
  {
    render=<h1>Sorry no Users Found :(</h1>;
      sessionStorage.setItem("search","false"); 
  }
  else if((sessionStorage.getItem("search")==="true")  && (props.newuser !== ""||props.newuser !== null))
  {
    render=<div
    onClick={() => {
      props.handleClick(props.newuser);
      console.log("hi");
    }}
    className="card"
  >
    <div className="img-container">
      <img
        alt="image"
        src="https://venturebeat.com/wp-content/uploads/2018/09/ironman.jpg?fit=1920%2C1376&strip=all"
      />

      <FontAwesomeIcon className="icon-block" icon={faUser} />
    </div>
    <div className="card-detail">
      <h4 className="title">{props.newuser.username}</h4>
      <p className="desc"></p>
    </div>
    <div className="time"></div>
    <div className="action-btn">
      <FontAwesomeIcon icon={faChevronDown} />
    </div>
  </div>
  sessionStorage.getItem("search","false");
  }




  return (
    <div className="chat-cards-listing">
    {/* {props.recentuser?<div
 
 onClick={async () => {
   await props.handleClick(props.recentuser);
   console.log("hi");
 }}
 className="card"
>
 <div className="img-container">
   <img
     alt="image"
     src="https://venturebeat.com/wp-content/uploads/2018/09/ironman.jpg?fit=1920%2C1376&strip=all"
   />

   <FontAwesomeIcon className="icon-block" icon={faUser} />
 </div>
 <div className="card-detail">
   <h4 className="title">{props.recentuser.username}</h4>
   <p className="desc">{(props.typing!=="" && props.typing.email===props.recentuser.email)?<i style = {{color:"#00ffff"}}>typing</i>:null}</p>
 </div>
 <div className="time">{moment(props.recentuser.UpdatedAt).format("ddd")} , {moment(props.recentuser.UpdatedAt).format("LT")}</div>
 <div className="action-btn">
   <FontAwesomeIcon icon={faChevronDown} />
 </div>
</div>:null} */}


    {render}



      {props.prevUsers !== null && props.prevUsers !== "" ?
         props.prevUsers.map((user, index) => {
       return <div
          key={index}
          onClick={ () => {
             props.handleClick(user);
            console.log("hi");
          }}
          className="card"
        >
          <div className="img-container">
            <img
              alt="image"
              src="https://venturebeat.com/wp-content/uploads/2018/09/ironman.jpg?fit=1920%2C1376&strip=all"
            />

            <FontAwesomeIcon className="icon-block" icon={faUser} />
          </div>
          <div className="card-detail">
            <h4 className="title">{user.username}</h4>
            <p className="desc">{(props.typing!=="" && props.typing.email===user.email)?<i style = {{color:"#00ffff"}}>typing</i>:null}</p>
          </div>
          <div className="time">{moment(chatObj.time).format("ddd")} , {moment(chatObj.time).format("LT")}</div>
          <div className="action-btn">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      }):null}
    </div>
  );
};

export default ChatCardsListing;
