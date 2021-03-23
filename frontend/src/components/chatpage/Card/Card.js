import React from 'react'
import '../ChatCardsListing/ChatCardsListing.scss'

function Card() {
    return (
        <div className="card">
        <div className="img-container">
          
            <img alt="image" src="https://venturebeat.com/wp-content/uploads/2018/09/ironman.jpg?fit=1920%2C1376&strip=all" />
          
            <FontAwesomeIcon className="icon-block" icon={faUser} />
          
        </div>
        <div className="card-detail">
          <h4 className="title">{user.username}</h4>
          <p className="desc">Hi! Shaurya</p>
        </div>
        <div className="time">
          10:20 PM
        </div>
        <div className="action-btn">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    )
}

export default Card
