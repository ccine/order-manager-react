import React, { useRef } from "react";
import "../Assets/Login.css";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

function Login() {
  const navigate = useNavigate();

  const ENTERHOME = gql`
    query userLogin($username: String!, $password: String!) {
      checkUser(username: $username, party_code: $party)
    }
  `;
  const [login, { loading, error, data }] = useLazyQuery(ENTERHOME);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function submit() {
    if (!usernameRef.current || !passwordRef.current) return;

    var username = "";
    var password = "";

    username = "" + usernameRef.current.value;
    password = "" + passwordRef.current.value;

    login({ variables: { username: username, password: password } }).then(
      (res) => {
        if (res.data.checkUser) {
          navigate("/Home");
        } else {
          alert("Credenziali errate");
        }
      }
    );
  }

  return (
    <div className="container">
      {/* Box */}
      <div className="loginBox">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            required
          />
          <br />
          <br />
          {/* Submit button */}
          <input
            type="submit"
            id="submitButton"
            value="Log in"
            onClick={() => submit()}
          />
        </form>
      </div>
    </div>
  );
}
export default Login;
