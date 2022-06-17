import React, { useRef } from "react";
import "../Assets/Login.css";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const ENTERHOME = gql`
    query userLogin($username: String!, $password: String!) {
      checkUser(username: $username, party_code: $party) {
        authentication
        role
      }
    }
  `;
  const [login, { loading, error, data }] = useLazyQuery(ENTERHOME);
  const navigate = useNavigate();

  function submit() {
    if (!usernameRef.current || !passwordRef.current) return;
    login({
      variables: {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      },
    });
  }

  return (
    <div className="container">
      <>
        {
          data?.authentication
            && navigate("/home")
            /** TODO SHOW NOT VALID USER */
        }
        {error && console.log(`Error! ${error}`) /** TODO SHOW ERROR ON PAGE */}
        {/* Box */}
        <div className="loginBox">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <h2 id="loginHeader">LOGIN</h2>

          {/* Login form */}
          <form>
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
          </form>
          {/* Submit button */}
          <button id="submitButton" onClick={() => submit()}>
            Log in
          </button>
        </div>
      </>
    </div>
  );
}
export default Login;
