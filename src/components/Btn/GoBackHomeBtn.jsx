import React from "react";
import "./GoBackHomeBtn.css";
import { useNavigate } from "react-router-dom";
import Btn from "./Btn";

const GoBackHomeBtn = () => {
  const navigate = useNavigate();
  // Go Back to the Home
  const goBackHomeBtn = (userId) => {
    navigate(`/home`);
  };

  return <Btn text="<" onClick={goBackHomeBtn} />;
};

export default GoBackHomeBtn;
