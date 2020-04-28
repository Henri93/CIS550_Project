import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../style/signup.css"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function postSignup(){
    fetch('/signup', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
      },
        //TODO add name passed in to post body
        body: JSON.stringify({ email: email, password: password })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.success) {
          //successful signup so redirect to homepage
          props.onLogin(data); 
          history.push("/");
        }else{
          //display error signup msg
        }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    postSignup();
  }

  return (
    <div className="Signup">
        <div className="nicerLog">
        <h1 className="h1-center">Yelp</h1>
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
          <FormGroup controlId="confirmPass" bsSize="large">
            <FormControl
              value={password}
              placeholder="Confirm Password"
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </FormGroup>
          <Button style={{ backgroundColor: "orange", borderColor: "orange" }} block type="submit">
            Login
        </Button>

        </form>
        <div className = "pStyle">
        <a  className = "aStl" href = "login">Back to login</a>
      </div>
      </div>
      
    </div>
  );
}