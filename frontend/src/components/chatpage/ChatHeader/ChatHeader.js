import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUser } from "@fortawesome/free-solid-svg-icons";
import React from 'react'

import './ChatHeader.scss';

const ChatHeader = () => {
 
  return (
    <div className="chat-header">
      <div className="img-container">
        <img src="https://venturebeat.com/wp-content/uploads/2018/09/ironman.jpg?fit=1920%2C1376&strip=all" alt="image"/>
        <FontAwesomeIcon className="icon-block" icon={faUser} /> 
      </div>
      <div className="card-detail">
          <h4 className="title">Shaurya</h4>
          <p className="desc">
           Online
          </p>
      </div>
      <div className="acion-items">
          <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
};

export default ChatHeader;
