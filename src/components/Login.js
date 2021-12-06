import React, { useState } from "react";
import axios from "axios";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lname, setLastName] = useState("");
  const [fname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [missingfields, setMissingFields] = useState(true);
  const [incorrectCreds, setIncorrectCreds] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setMissingFields(true);
    setIncorrectCreds(true);
    setEmail("");
    setLastName("");
    setFirstName("");
    setUsername("");
    setPassword("");
    if (username === "" || password === "") {
      setMissingFields(false);
      setIncorrectCreds(true);
      setEmail("");
      setLastName("");
      setFirstName("");
      setUsername("");
      setPassword("");
    } else {
      setLoading(true);
      //http://52.14.240.217:8080/api/v1/login-user
      axios
        .post("http://52.14.240.217:8080/api/v1/login-user", {
          username: username,
          password: password,
        })
        .then((response) => {
          setLoading(false);
          if (response.data.loggedIn === true) {
            console.log("User successfully logged in!!!");
            // console.log("response >>> " + JSON.stringify(response));
            setUsername(response.data.username);
            setLastName(response.data.lname);
            setFirstName(response.data.fname);
            setEmail(response.data.email);
            setUserLoggedIn(true);
          } else if (response.data === false) {
            setIncorrectCreds(false);
            setMissingFields(true);
          }
        })
        .catch((error) => {
          setIncorrectCreds(false);
          setMissingFields(true);
          setEmail("");
          setLastName("");
          setFirstName("");
          setUsername("");
          setPassword("");
          setLoading(false);
          if (error.status === 404 || error.status === 401) {
            console.error("User authentication failed!!!");
            props.history.push("/login");
          }
        });
    }
  };

  return (
    <form>
      <div>
        <br />
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="enter the username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="enter the password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!missingfields ? "***Please enter all fields***" : ""}
        {!incorrectCreds ? "***Entered Incorrect Credentials***" : ""}
        <div className="form-group">
          <input
            type="button"
            value={loading ? "Logging in..." : "Login"}
            disabled={loading}
            onClick={handleLogin}
          />
        </div>

        <br />
        <br />
        {userLoggedIn
          ? "User Successfully Logged in. Please find details below for:  " +
            username
          : ""}
        <br />
        <br />
        {userLoggedIn ? "UserName:  " + username : ""}
        <br />
        {userLoggedIn ? "FirstName:  " + fname : ""}
        <br />
        {userLoggedIn ? "LastName:  " + lname : ""}
        <br />
        {userLoggedIn ? "Email:  " + email : ""}
        <br />

        <br />
      </div>
    </form>
  );
};
