import React from "react";
import "../Assets/CSS/ProgressBar.css";

export default function ProgressBar({ progress }) {
  const OuterBar = {
    height: "2rem",
    width: "60%",
    backgroundColor: "transparent",
    border: "1px solid #6bcfcf",
  };
  const InnerBar = {
    height: `${progress}%`,
    width: "41.5%",
    bottom: "68.3%",
    left: "30.7%",
    position: "absolute",
    backgroundColor: "#6bcfcf",
    transition: "0.5s ease-in",
  };
  return (
    <div className="outerbar" style={OuterBar}>
      <div style={InnerBar} className="innerbar"></div>
    </div>
  );
}
