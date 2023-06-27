import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./LogIn/Login";
import NewAccount from "./NewAccount/NewAccount";
import ChatRoom from "./Top/ChatRoom/ChatRoom";
import Profile from "./Top/ProfileSetting/Profile";
import Contacts from "./Top/Contacts/Contacts";
import Home from "./Top/Home";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import { firebaseApp } from "../components/firebase";
import Demo from "../components/Demo";

function App() {
  // npm install --save react-firebase-hooks

  return (
    firebaseApp && (
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Login />} />
          <Route path={`/home`} element={<Home />} />
          <Route path={`/new_account`} element={<NewAccount />} />
          {/* <Route path={`/welcome`} element={<Welcome />} /> */}
          <Route path={`/chatroom/:conversationId`} element={<ChatRoom />} />
          <Route path={`/profile`} element={<Profile />} />
          <Route path={`/contacts`} element={<Contacts />} />
          <Route path={`/demo`} element={<Demo />} />
        </Routes>
      </BrowserRouter>
    )
  );
}

export default App;
