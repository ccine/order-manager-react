import React, { useRef, useState } from "react";
import "../Assets/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Auth";
import HighContrastModeButton from "../Components/HighContrastModeButton";

function Login(props: {
  highContrastMode: boolean;
  setHighContrastMode: (arg0: boolean) => void;
}) {
  document.querySelector("title")!.textContent = "OrderManager - LoginPage"; // Change the page's title
  const usernameRef = useRef<HTMLInputElement>(null); // Reference to usernameInput
  const passwordRef = useRef<HTMLInputElement>(null); // Reference to passwordInput
  const [error, setError] = useState<undefined | string>(undefined); // State of error

  const navigate = useNavigate(); // Allows navigation to the next page
  const auth = useAuth(); // Variable to use authentication function and state

  /**
   * Check if the username and password are correct and go to Home page, if not set the error state
   * @param event Event that invoked the function
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

  return (
    <div className="containerPageLogin">
      {/* LOGIN HEADER */}
      <header className="loginHeader">
        <HighContrastModeButton id="styleSwitcherLogin" highContrastMode={props.highContrastMode} setHighContrastMode={props.setHighContrastMode}/>
      </header>

      <main>
        {/* LOGIN BODY */}
        <div className="loginBody">
          {/* login Box */}
          <div
            className="loginBox"
            role="region"
            aria-labelledby="loginBoxTitle"
          >
            <h1 id="loginBoxTitle" className="marginBottom elementHoverFocus" tabIndex={0}>
              LOGIN
            </h1>
            {/* Login form */}
            <form className="loginForm" onSubmit={handleSubmit}>
              {/* Username */}
              <label
                htmlFor="usernameInput"
                className="labelLogin elementHoverFocus"
                tabIndex={0}
              >
                Username:
              </label>
              <br />
              <input
                tabIndex={0}
                className="marginBottom inputLogin elementHoverFocus"
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
              <label
                htmlFor="passwordInput"
                className="labelLogin elementHoverFocus"
                tabIndex={0}
              >
                Password:
              </label>
              <br />
              <input
                tabIndex={0}
                className="inputLogin elementHoverFocus"
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
              <button
                type="submit"
                id="submitLoginButton"
                className="buttons logButton"
                tabIndex={0}
              >
                <strong>Log in</strong>
              </button>
              {/* Error div */}
              {error && (
                <div className="error textHoverFocus" role="alert" tabIndex={0}>
                  <p>
                    <strong>Error: </strong>
                    {error}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
export default Login;
