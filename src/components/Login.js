import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../style/login.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <div className="nicerLog">
        <h1 className="h1-center">Yelp</h1>
        {/* <div class="diamond-shape">
          <div class="item-count">99</div>
        </div> */}

        <form onSubmit={handleSubmit} className="emailEr">
          <FormGroup className="topper" controlId="email" bsSize="large">
            <FormControl
              autoFocus
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormControl
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>

          <Button style={{ backgroundColor: "orange", borderColor: "orange" }} block type="submit">
            Login
        </Button>

        </form>
        <div className="pStyle">
          <a className="aStl" href="signup">Don't have an account? <br></br> Sign up here!</a>
        </div>
      </div>


    </div>
  );
}