import './ProfileSection.scss'
import React from 'react'



const ProfileSection = (props) => {
  
    return (
        <div className="profile-section">
            <div className="img-container">
                <img alt="image" src="https://venturebeat.com/wp-content/uploads/2018/09/ironman.jpg?fit=1920%2C1376&strip=all" />
            </div>
            
            <div >{props.currentuser.username}</div>
           
            <div onClick={()=>{props.handlelogout()}} className="action-items" >
                Logout
            </div>
        </div>
    )
}

export default ProfileSection;