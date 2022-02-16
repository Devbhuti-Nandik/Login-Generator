import React, { useState } from "react";
import "../Assets/CSS/Timer.css";
import "../App.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import fingerprint from "../Assets/Images/fingerprint.png";
import ProgressBar from "./ProgressBar";
import { isAuth } from "../services/Auth";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Timer(props) {
  /*global*/
  let timeLeft = 10;
  let progressLevel = 30;

  /*animation and re-initating hooks. */
  const [isActive, setIsActive] = useState(false);
  const [progressWidth, setProgressWidth] = useState(30);
  const [displayTime, setDisplayTime] = useState(timeLeft);
  const [password, setPassword] = useState("");
  const [pauseEffect, setPauseEffect] = useState(null);

  /*Snackbar hooks */
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  /*conditional rendering */
  const [render, setRender] = useState(false);

  /*event handlers */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const close = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsValid(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      localStorage.getItem("timeLeft") &&
      localStorage.getItem("timeLeft").toString() === "0"
    ) {
      setIsValid(true);
      return;
    }

    if (isAuth(password)) {
      setIsActive(!isActive);
      props.active(!isActive);
      if (localStorage.getItem("timeLeft"))
        timeLeft = localStorage.getItem("timeLeft");
      if (localStorage.getItem("progressLevel"))
        progressLevel = localStorage.getItem("progressLevel");
      let x = setInterval(function () {
        if (timeLeft <= 0) {
          handleExit(0, 0);
          clearInterval(x);
          setDisplayTime(0);
          setProgressWidth(0);
          setPassword("");
          setRender(true);
          alert("Time over");
        } else {
          timeLeft = timeLeft - 1;
          progressLevel = progressLevel - 3;
          setDisplayTime(timeLeft);
          setProgressWidth(progressLevel);
        }
      }, 1000);
      setPauseEffect(x);
    } else {
      setOpen(true);
    }
  };

  const handleExit = (timeRemain, progressBar) => {
    setIsActive(false);
    props.active(!isActive);

    localStorage.setItem("timeLeft", timeRemain);
    localStorage.setItem("progressLevel", progressBar);
    clearInterval(pauseEffect);
  };

  return (
    <>
      <article className={isActive ? "circle circle__animation" : "circle"}>
        <div className="circle__image">
          <img className="image" src={fingerprint} alt="finger_print" />
        </div>
        <div className="circle__input">
          <form onSubmit={handleLogin}>
            <label htmlFor="password">Enter your pilearning password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>
        </div>
        <div className="circle__btn">
          <button onClick={handleLogin}>Enter Lab</button>
        </div>
      </article>
      <article className="timer__main">
        <section className="progressbar">
          <ProgressBar progress={progressWidth} />
        </section>
        <section className="timer">
          <h1>{displayTime} minutes left</h1>
          <h5>out of 10 minutes</h5>
        </section>
      </article>
      <article
        className="exit__main"
        style={{ display: isActive ? "flex" : "none" }}
      >
        <button
          onClick={() => {
            handleExit(displayTime, progressWidth);
          }}
        >
          Exit
        </button>
      </article>

      {/* conditional rendering for fixing bug. */}
      <div style={{ display: render ? "flex" : "none" }}>
        <article className="screen">
          <aside
            className={isActive ? "slider slider__left" : "slider"}
          ></aside>
          <div
            style={{
              minHeight: "100vh",
              backgroundColor: "#111111",
              minWidth: "4px",
            }}
          ></div>
          <aside
            className={isActive ? "slider slider__right" : "slider"}
          ></aside>
        </article>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Invalid Password!!!
        </Alert>
      </Snackbar>

      <Snackbar
        open={isValid}
        autoHideDuration={6000}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={close} severity="error" sx={{ width: "100%" }}>
          No time left!!!
        </Alert>
      </Snackbar>
    </>
  );
}
