import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { SessionContext, getSessionCookie, setSessionCookie } from "./session";
import "../style/login.css"

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function postLogin(){
    fetch('/login', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({ email: email, password: password })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.success) {
          //successful login so redirect to homepage
          setSessionCookie({user: data.res});
          history.push("/");
        }else{
          //display error login msg
        }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    postLogin();
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