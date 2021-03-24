import React, { useState, useEffect, useCallback, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

import "./ChatPage.scss";
import ProfileSection from "./ProfileSection/ProfileSection";
import SearchPeople from "./SearchPeople/SearchPeople";
import ChatCardsListing from "./ChatCardsListing/ChatCardsListing";
import ChatSection from "./ChatSection/ChatSection";

function ChatPage(props) {

  const currentuser = JSON.parse(sessionStorage.getItem("User"));
  const id = currentuser.email;
  const [prevUsers, setprevUsers] = useState(
    JSON.parse(sessionStorage.getItem("prevUsers"))
  );
  const [newuser, setnewuser] = useState(
    JSON.parse(sessionStorage.getItem("newuser"))
  );
  const [selectedUser, setselectedUser] = useState("");
  useEffect(() => {
    setnewuser(JSON.parse(sessionStorage.getItem("newuser")));
    setprevUsers(JSON.parse(sessionStorage.getItem("prevUsers")));
    socket.emit("join-user", currentuser, (cbData) => {
        console.log(cbData);
      });
  }, []);



  

  const [chatData, setchatData] = useState([]);
  const updateChat = (chatObj) => {
    setchatData([...chatData, chatObj]);
  };

  const socket = io("http://localhost:5000", {
    query: { token: id },
    reconnectionAttempts: 5,
    transports: ["websocket", "polling", "flashsocket"],
  });


  //handleprevUsers();

  useEffect(() => {
    if (socket == null) return;

    socket.on("send-msg", (chatObj) => {
      setchatData([...chatData, chatObj]);
    });

    return () => socket.off("send-msg");
  }, [socket]);

  const chatsocks = (chatObj) => {
    socket.emit("send-msg", chatObj, (cbData) => {
      console.log(cbData);
      return () => socket.off("send-msg");
    });
  };

  //socket ends

  //handle logout

  const handlelogout = () => {
    props.history.push("/login");
    sessionStorage.removeItem("User");
    sessionStorage.removeItem("newuser");
    sessionStorage.removeItem("selecteduser");
    sessionStorage.removeItem("prevUsers");
  };

  //handle prevusers
  const handleprevUsers = async () => {
    await axios
      .post(
        "http://localhost:5000/getPreviousUsers",
        JSON.parse(sessionStorage.getItem("User"))
      )
      .then((response) => {
        console.log(response.data);
        if (response.data !== null) {
          setprevUsers(response.data);
          sessionStorage.setItem("prevUsers", JSON.stringify(response.data));
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // handle search-user

  const handlesearchuser = async () => {
    await axios
      .post(
        "http://localhost:5000/getUsersList",
        JSON.parse(sessionStorage.getItem("User"))
      )
      .then((response) => {
        console.log(response.data);
        if (response.status !== 400) {
          setnewuser(response.data);
          setselectedUser(response.data);
          sessionStorage.setItem("newuser", JSON.stringify(response.data));
          sessionStorage.setItem("selecteduser", JSON.stringify(response.data));
          sessionStorage.setItem("search","true"); 
        }
      })

      .catch((error) => {
        console.log(error);
      });

    handleprevUsers();
  };
  //handle previous users

  //click to select user

  const handleClick = async (Suser) => {
    await setselectedUser(Suser);
    console.log(Suser);
    await axios
      .post("http://localhost:5000/findChat", {
        email1: JSON.parse(sessionStorage.getItem("User")).email,
        email2: selectedUser.email,
      })
      .then((res) => {
        setchatData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Chatpage">
      <div className="left-side">
        <ProfileSection
          handlelogout={handlelogout}
          handlesearchuser={handlesearchuser}
        />
        <SearchPeople />
        <ChatCardsListing
          handleClick={handleClick}
          newuser={newuser}
          prevUsers={prevUsers}
        />
      </div>
      <div className="right-side">
        <ChatSection
          updateChat={updateChat}
          chatData={chatData}
          selectedUser={selectedUser}
          chatsocks={chatsocks}
        />
      </div>
    </div>
  );
}

export default ChatPage;