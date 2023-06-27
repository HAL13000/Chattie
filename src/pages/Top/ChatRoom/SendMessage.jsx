import React, { useState } from "react";
import "./SendMessage.css";
import { auth, db } from "../../../components/firebase";
import firebase from "firebase/compat/app";
import { Input } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";

const SendMessage = ({ handleScroll }) => {
  const [message, setMessage] = useState("");
  const params = useParams();
  const user = auth.currentUser;
  const userId = user?.uid;

  function sendMessage(e) {
    e.preventDefault();
    // const user = auth.currentUser;
    if (user) {
      const { uid, photoURL } = auth.currentUser;
      db.collection("conversations")
        .doc(params.conversationId)
        .collection("messages")
        .add({
          text: message,
          photoURL,
          uid: userId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setMessage("");
      handleScroll();
      // scroll.current.scrollIntoView({ behavior: "smooth" });
    } else console.log("user is null");
  }
  return (
    <div className="sendMsg">
      <form action="" onSubmit={sendMessage}>
        <div className="sendMsgContainer">
          <Input
            type="text"
            placeholder="Type a message."
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%" }}
            value={message}
          />
          <SendIcon
            className="sendMsgSendIcon"
            style={{ color: "#7AC2FF", marginLeft: "20px" }}
            type="submit"
            onClick={sendMessage}
          />
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
