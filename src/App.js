import React, { useState, useEffect } from "react";
import "../src/App.css";
import Timer from "./components/Timer";

export default function App() {
  const [isActive, setIsActive] = useState(false);

  /*Animation active handler*/
  const checkActive = (active) => {
    setIsActive(active);
  };

  /*Cleaning Local Storage on refresh */
  useEffect(() => {
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("progressLevel");
  }, []);

  return (
    <div className="main">
      <Timer timeLeft={10} active={checkActive} />
      <article className="screen">
        <aside className={isActive ? "slider slider__left" : "slider"}></aside>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#111111",
            minWidth: "4px",
          }}
        ></div>
        <aside className={isActive ? "slider slider__right" : "slider"}></aside>
      </article>
    </div>
  );
}
