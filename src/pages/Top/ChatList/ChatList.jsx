import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { db } from "../../../components/firebase";
import { getAuth } from "firebase/auth";
import Myconversation from "../../../components/Myconversation/Myconversation";

const ChatList = ({ userId }) => {
  const [conversations, setConversations] = useState([]);

  // Fetch conversations from Firebase Database
  useEffect(() => {
    db.collection("conversations")
      .orderBy("createdAt")
      .where("users", "array-contains", userId)
      .get()
      .then((querySnapshot) => {
        // console.log(querySnapshot);
        const conversationsData = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          let entry = doc.data();
          entry.id = doc.id;
          conversationsData.push(entry);
        });
        setConversations(conversationsData);
      });
  }, []);

  // Myconversation-> function to fetch messages from each conversations
  return (
    <div>
      {conversations &&
        conversations.map((conversation) => {
          return (
            <div key={conversation.id}>
              <Myconversation id={conversation.id} />
            </div>
          );
        })}
    </div>
  );
};
export default ChatList;
