import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import "./ChatCardsListing.scss";
const ChatCardsListing = (props) => {
  const [newuser, setnewuser] = useState("");

  const [prevUsers, setprevUsers] = useState([]);
  useEffect(() => {
    setnewuser(props.newuser);
    if(props.prevUsers!==null)
    setprevUsers(props.prevUsers);
    
  }, []);

  let render=null;

 
  if((sessionStorage.getItem("search")==="true")  && (newuser === ""||newuser === null))
  {
    render=<h1>Sorry no Users Found :(</h1>;
      sessionStorage.setItem("search","false"); 
  }
  else if((sessionStorage.getItem("search")==="true")  && (newuser !== ""||newuser !== null))
  {
    render=<div
    onClick={() => {
      props.handleClick(newuser);
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
      <h4 className="title">{newuser.username}</h4>
      <p className="desc">Hi! Shaurya</p>
    </div>
    <div className="time">10:20 PM</div>
    <div className="action-btn">
      <FontAwesomeIcon icon={faChevronDown} />
    </div>
  </div>
  sessionStorage.getItem("search","false");
  }




  return (
    <div className="chat-cards-listing">
    {render}
      {prevUsers !== null && prevUsers !== "" ?
         prevUsers.map((user, index) => {
       return <div
          key={index}
          onClick={async () => {
            await props.handleClick(user);
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
            <p className="desc">{(props.typing!=="" && props.typing.email===user.email)?<i style={{ color: "#a7a7a7" }}>typing</i>:null}</p>
          </div>
          <div className="time">{user.UpdatedAt}</div>
          <div className="action-btn">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      }):null}
    </div>
  );
};

export default ChatCardsListing;
