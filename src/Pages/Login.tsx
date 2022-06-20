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
    let username = formData.get("username_input") as string;
    let password = formData.get("password_input") as string;

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
          <h2 id="loginHeader">LOGIN</h2>

          {/* Login form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <label htmlFor="username_input">Username</label>
            <br />
            <input
              type="text"
              id="username_input"
              name="username_input"
              placeholder="Enter your username"
              ref={usernameRef}
              required
            />
            <br />
            {/* Password */}
            <label htmlFor="password_input">Password</label>
            <br />
            <input
              type="password"
              id="password_input"
              name="password_input"
              placeholder="Enter your password"
              ref={passwordRef}
              required
            />
            <br />
            <br />
            {/* Submit button */}
            <button type="submit">Log in</button>
          </form>
        </div>
      </>
    </div>
  );
}
export default Login;
