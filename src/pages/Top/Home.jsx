import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "./ChatList/ChatList";
import firebase from "firebase/compat/app";
import "./Home.css";
import Btn from "../../components/Btn/Btn";
import { getAuth } from "firebase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CreateChat from "../../components/CreateChat/CreateChat";
import { Modal } from "../../components/Modal/Modal";

export default function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  let userId;
  if (user) {
    userId = user.uid;
  }
  const [showOverlay, setShowOverlay] = useState(false);
  const [isClose, setIsClose] = useState(false);

  function handleSignOut() {
    auth.signOut().then(
      () => {
        navigate("/");
        console.log(userId + "is logout");
      },
      (error) => {
        navigate("/home");
      }
    );
  }
  function handleProfile() {
    navigate("/profile");
  }
  function handleContacts() {
    navigate("/contacts");
  }
  // Open and close Menu
  const handleOpenMenu = () => {
    setShowOverlay(true);
  };

  const handleCloseMenu = () => {
    setShowOverlay(false);
  };

  return (
    auth && (
      <div className="homeContainer">
        {!showOverlay && (
          <div className="container">
            {(!user?.displayName || !user?.photoURL) && !isClose && (
              <Modal isClose={isClose} setIsClose={setIsClose} />
            )}
            <header className="home">
              <div className="sp_menu">
                <MenuIcon onClick={handleOpenMenu} />
              </div>
              <h1>Chat</h1>
              <div className="pc_menu">
                <Btn text="Contacts" onClick={handleContacts} />
                <Btn text="Profile" onClick={handleProfile} />
                <Btn text="Sign Out" onClick={handleSignOut} />
              </div>
            </header>
            <CreateChat userId={userId} />
            {user && <ChatList userId={userId} />}
          </div>
        )}

        {showOverlay && (
          <div className="homeOverlay">
            <div className="overlayCloseIcon">
              <CloseIcon onClick={handleCloseMenu} />
            </div>
            <ul className="menu_nav_list">
              <li className="menu_nav_item">
                <Btn text="Contacts" onClick={handleContacts} />
              </li>
              <li className="menu_nav_item">
                <Btn text="Profile" onClick={handleProfile} />
              </li>
              <li className="menu_nav_item">
                <Btn text="Sign Out" onClick={handleSignOut} />
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  );
}
