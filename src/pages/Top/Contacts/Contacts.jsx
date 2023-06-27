import React, { useEffect, useState } from "react";
import "./Contacts.css";
import GoBackHomeBtn from "../../../components/Btn/GoBackHomeBtn";
import firebase from "firebase/compat/app";
import { db, auth } from "../../../components/firebase";
import { getAuth, getUsers } from "firebase/auth";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch contacts from users collection on Firestore
  useEffect(() => {
    db.collection("users")
      .orderBy("displayName")
      .get()
      .then((querySnapshot) => {
        const contactsData = [];
        querySnapshot.forEach((doc) => {
          let entry = doc.data();
          entry.id = doc.id;
          contactsData.push(entry);
        });
        setContacts(contactsData);
      });
  });

  return (
    <div className="contacts">
      <header className="contacts">
        <div className="contactsContainer">
          <GoBackHomeBtn />
          <h1>Contacts</h1>
        </div>
      </header>
      <div className="contactsListWrapper">
        <ul className="contactsList">
          {contacts &&
            contacts.map((entry) => (
              <li key={entry.publicId}>
                <img src={entry.photoURL} />
                <div className="contactsInfos">
                  <div className="contactsSmallContainer">
                    <p className="contactsInfo">Name:</p>
                    <p className="contactsData">{entry.displayName}</p>
                  </div>
                  <div className="contactsSmallContainer">
                    <p className="contactsInfo">FriendID:</p>
                    <p className="contactsData">{entry.publicId}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
