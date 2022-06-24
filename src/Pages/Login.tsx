import React, { useRef, useState } from "react";
import "../Assets/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Auth";

function Login() {
  document.querySelector('title')!.textContent = "LoginPage";                         // Change the page's title
  const usernameRef = useRef<HTMLInputElement>(null);                                 // Reference to usernameInput          
  const passwordRef = useRef<HTMLInputElement>(null);                                 // Reference to passwordInput
  const [error, setError] = useState<undefined | "Server error" | "The username or password is incorrect">(undefined);  // State of error
  const [highConstrastMode, setHighContrastMode] = useState<boolean>(false);                                            // State of highContrastMode
  const head = document.head;              // Returns the <head> element of the current document
  var css;                                 // Variable to insert css rules

  let navigate = useNavigate();            // Allows navigation to the next page
  let auth = useAuth();                    // TODO

  /**
   * TODO
   * @param event 
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get("usernameInput") as string;
    let password = formData.get("passwordInput") as string;

    auth.signin(
      username,
      password,
      () => {
        navigate("/Home", { replace: true });
      },
      () => {
        setError("The username or password is incorrect");
        passwordRef.current!.value = "";
      },
      () => {
        setError("Server error");
      }
    );
  }

  /**
   * Function that changes all the colors of the page by cheching the state of highContrastMode and then changes its value
   * highConstrastMode: false --> highContrastMode ON, !highConstrastMode
   * highConstrastMode: true --> highContrastMode OFF, !highConstrastMode
   */
  function changeContrast(){
    if(!highConstrastMode){
      css = `html {filter: invert(100%);}`;
    }
    else{
      css = `html {filter: invert(0%);}`;
    }

    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.sheet) {
      style.sheet.insertRule(css, 0);
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    setHighContrastMode(!highConstrastMode);
  }
  

  return (
    <div className="containerPageLogin">
        {/* LOGIN HEADER */}
        <header className="loginHeader">
          {/* highContrastMode button */}
          <button id="styleSwitcher" className="buttonLogin" onClick={changeContrast} tabIndex={8}>High Contrast Mode: {highConstrastMode ? "ON" : "OFF"}</button>
        </header>

        {/* LOGIN BODY */}
        <div className="loginBody">
          {/* login Box */}
        <div className="loginBox" role="region" aria-labelledby="loginBoxTitle">
          <h1 id="loginBoxTitle" className="marginBottom" tabIndex={1}>LOGIN</h1>
          {/* Login form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <label htmlFor="usernameInput" className="labelLogin" tabIndex={2}>Username:</label>
            <br />
            <input
              tabIndex={3}
              className="marginBottom inputLogin"
              type="text"
              id="usernameInput"
              name="usernameInput"
              placeholder="Enter your username"
              autoComplete="username"
              ref={usernameRef}
              required
            />
            <br />
            {/* Password */}
            <label htmlFor="passwordInput" className="labelLogin" tabIndex={4}>Password:</label>
            <br />
            <input
              tabIndex={5}
              className="inputLogin"
              type="password"
              id="passwordInput"
              name="passwordInput"
              placeholder="Enter your password"
              autoComplete="current-password"
              ref={passwordRef}
              required
            />
            <br />
            <br />
            {/* Submit button */}
            <button type="submit" id="submitButton" className="buttonLogin" tabIndex={6} aria-label="submit button" title="submit button"><strong>Log in</strong></button>
            {/* Error div */}
            {error && <div className="error" role="alert" tabIndex={7}><p><strong>Error: </strong>{error}</p></div>}
          </form>
        </div>
        </div>
      </div>
  );
}
export default Login;
