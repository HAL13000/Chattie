import React from "react";
import "./Btn.css";

function Btn(props) {
  return (
    <button
      type={props.type}
      for={props.for}
      onClick={props.onClick}
      {...props}
    >
      {props.text}
    </button>
  );
}

export default Btn;
