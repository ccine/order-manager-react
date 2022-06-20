import React, { useRef } from "react";
import "../Assets/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth";

function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  let navigate = useNavigate();
  let auth = useAuth();

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
        alert("Login failed");
      },
      () => {
        alert("Server error");
      }
    );
  }

  return (
    <div className="container">
      <>
        {/* Box */}
        <div className="loginBox">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <h1 id="loginHeader" className="marginBottom">LOGIN</h1>

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <label htmlFor="usernameInput">Username</label>
            <br />
            <input
              className="marginBottom"
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
            <label htmlFor="passwordInput">Password</label>
            <br />
            <input
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
            <button type="submit" id="submitButton">Log in</button>
          </form>
        </div>
      </>
    </div>
  );
}
export default Login;
