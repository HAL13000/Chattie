import React, { useState } from "react";
import "./Modal.css";
import Btn from "../Btn/Btn";
import { useNavigate } from "react-router-dom";

export const Modal = ({ isClose, setIsClose }) => {
  const navigate = useNavigate();

  function handleUpdateProfile() {
    navigate("/profile");
  }

  function handleCloseModal() {
    setIsClose(true);
  }
  return (
    <div className="modal">
      <div className="modalContainer">
        <p>
          Hello!
          <br />
          You haven't update your profile yet.
          <br />
          Please set your nickname and profile image to enjoy Chattie!
        </p>
        <div className="modalBtns">
          <Btn text="Update Profile" onClick={handleUpdateProfile} />
          <Btn text="Later" onClick={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};
