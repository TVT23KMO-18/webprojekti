import React from "react";
import "./Popup.css";

export default function Popup(props) {
  return props.trigger ? (
    <div className="popupcontainer">{props.children}</div>
  ) : null;
}
