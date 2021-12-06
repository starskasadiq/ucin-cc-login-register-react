import React, { useState } from "react";
import axios from "axios";

export const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [lname, setLastName] = useState("");
  const [fname, setFirstName] = useState("");
  const [registering, setRegistering] = useState(false);
  const [incorrectSignupDetails, signupSuccess] = useState(true);

  const handleRegister = () => {
    setRegistering(true);
    signupSuccess(true);
    //http://52.14.240.217:8080/api/v1/register-user
    axios
      .post("http://52.14.240.217:8080/api/v1/register-user", {
        username: username,
        password: password,
        fname: fname,
        lname: lname,
        email: email,
      })
      .then((response) => {
        setRegistering(false);
        signupSuccess(true);
        if (response.status === 201) {
          console.log("User successfully registered!!!");
          props.history.push("/login");
        }
      })
      .catch((error) => {
        setRegistering(false);
        signupSuccess(false);
        if (error.status !== 201) {
          console.error("User registration failed!!!");
        }
      });
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
            placeholder="enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="enter password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={fname}
            className="form-control"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lname}
            className="form-control"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            className="form-control"
            placeholder="users@mail.uc.edu"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="button"
            value={registering ? "Loading..." : "Register"}
            disabled={registering}
            onClick={handleRegister}
          />
        </div>
        {!incorrectSignupDetails
          ? "***Entered information already exists.. Provide new values***"
          : ""}
      </div>
    </form>
  );
};
