import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../../../components/firebase";
import SendMessage from "./SendMessage";
import { useNavigate, useParams } from "react-router-dom";
import Btn from "../../../components/Btn/Btn";
import "./ChatRoom.css";
import GoBackHomeBtn from "../../../components/Btn/GoBackHomeBtn";

function ChatRoom({}) {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const userId = user?.uid;
  const scroll = useRef();
  const [friendData, setFriendData] = useState([]);

  useEffect(() => {
    db.collection("conversations")
      .doc(params.conversationId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          const entry = doc.data();
          entry.id = doc.id;
          messagesData.push(entry);
        });
        setMessages(messagesData);
      });
  }, []);
  // Fetch friends display name
  useEffect(() => {
    db.collection("conversations")
      .doc(params.conversationId)
      .get()
      .then((doc) => {
        console.log(doc);
        let friendId = doc.data().users.filter(isMyFriend);
        db.collection("users")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((userData) => {
              console.log("hellooooo", userData.data(), friendId);
              if (userData.data().publicId === friendId[0]) {
                setFriendData(userData.data());
              }
            });
          });
      });
  }, []);
  function isMyFriend(value) {
    return value !== user?.uid;
  }

  function handleScroll() {
    scroll.current.scrollTo({
      // bottom: 0,
      top: 1000000000,
      behavior: "smooth",
    });
  }

  return (
    <div className="chatRoom">
      <header className="chatRoom">
        <div className="chatRoomContainer">
          <GoBackHomeBtn />
          <div className="usersName">{friendData.displayName}</div>
        </div>
        <h1>Chat Room</h1>
      </header>

      <div className="chatroomMsgs" ref={scroll}>
        {messages.map((message) => {
          // if (!uid) {
          //   return null;
          // }
          return (
            <div>
              <div
                key={message.id}
                className={`bubble ${
                  message.uid === userId ? "sent" : "received"
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chatRoomSend">
        <SendMessage handleScroll={handleScroll} />
      </div>
    </div>
  );
}

export default ChatRoom;

{
  /* <div className="chatRoomSend">
<form onSubmit={handleSendMessage}>
  <Input
    handleScroll={handleScroll}
    type="text"
    name="sendMessage"
    placeholder="Send a message"
    style={{ width: "100%" }}
  />
  <SendIcon className="chatRoomSendIcon" type="submit" />
  <SendMessage handleScroll={handleScroll} style={{ width: "100%" }} />
</form>
</div> */
}
