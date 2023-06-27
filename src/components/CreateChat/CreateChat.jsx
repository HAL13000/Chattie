import React, { useEffect, useState } from "react";
import "./CreateChat.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import Btn from "../Btn/Btn";
import { db } from "../firebase";
import { Input } from "@mui/material";

const CreateChat = ({ publicId }) => {
  const [friendsId, setFriendsId] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  function createNewChat(e) {
    e.preventDefault();
    // Make a new Chat collection
    if (publicId) {
      db.collection("conversations")
        .add({
          users: [`${friendsId}`, `${publicId}`],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((response) => {
          setFriendsId("");
          console.log(response.id);
          navigate(`/chatroom/${response.id}`);
        });
    } else console.log("Error creating new chat:");
    // });
  }

  return (
    <div className="createChat">
      <p>Start New Chat</p>
      <form className="createChat" onSubmit={createNewChat}>
        <Input
          type="text"
          name="friendsId"
          value={friendsId}
          placeholder="Enter Friends User ID"
          onChange={(e) => setFriendsId(e.target.value)}
          style={{ width: "100%" }}
        />
        <Btn text="Create" type="submit" />
      </form>
    </div>
  );
};

export default CreateChat;
