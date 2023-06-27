import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "./Myconversation.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db, auth } from "../firebase";

export default function Myconversation({ id }) {
  const [messages, setMessages] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const photoURL = user.photoURL;
    const uid = user.uid;
  }

  // Fetch messages from conversations
  useEffect(() => {
    db.collection("conversations")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(1)
      .onSnapshot((querySnapshot) => {
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          const entry = doc.data();
          entry.id = doc.id;
          messagesData.push(entry);
        });
        setMessages(messagesData);
      });
  }, [id]);

  // Fetch Other User's Profile Infos
  useEffect(() => {
    db.collection("conversations")
      .doc(id)
      .get()
      .then((doc) => {
        // console.log(doc.data);
        let friendId = doc.data().users.filter(isMyFriend);
        // console.log(friendId);
        db.collection("users")
          .get()
          .then((querySnapshot) => {
            // const friendData = [];
            querySnapshot.forEach((userData) => {
              // console.log("hellooooo", userData.data(), friendId);
              if (userData.data().publicId === friendId[0]) {
                setFriendData(userData.data());
              }
            });
          });
      });
  }, []);
  function isMyFriend(value) {
    return value !== user.uid;
  }
  // handleConversationClick
  const handleConversationClick = () => {
    navigate(`/chatroom/${id}`);
    // navigate("/conversation/${id}");
  };

  //   Get and show the latest message by retreaving covnersations collection with `userId`
  return (
    <div className="myConversation" onClick={handleConversationClick}>
      {messages[0] ? (
        messages.map((entry) => (
          <div className="myConv_conversation" key={entry.uid}>
            {friendData && <img src={friendData.photoURL} />}
            <div className="myConvContents">
              <p className="myConvDisplayName">
                {friendData.displayName ?? ""}
              </p>
              <div className="myConvMessage">{entry.text}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="myConv_conversation">
          <img src={user.photoURL} />
          <div className="myConvContents">
            <p className="myConvDisplayName">{user.displayName}</p>
            <p className="myConvMessage">Start Chatting!</p>
          </div>
        </div>
      )}
    </div>
  );
}
