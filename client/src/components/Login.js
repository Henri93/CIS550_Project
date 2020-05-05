import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, FormGroup, FormControl, Modal } from "react-bootstrap";
import cookie from 'react-cookies'
import "../style/login.css"
import { withRouter } from "react-router-dom";


class Login extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      history:"",
      isOpen: false
    };
    this.postLogin = this.postLogin.bind(this);

  }



  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  postLogin () {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.state.email, password: this.state.password })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          //successful login so redirect to homepage
          cookie.save('user', data.res, { path: '/' })
          this.props.history.push("/");
        } else {
          //display error login msg
          this.setState({ isOpen: true });



        }
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();


    this.postLogin();
  }

  hideModal = () =>{
    this.setState({ isOpen: false });

  }


  render() {
    return (
      <div className="Login">
        <div className="nicerLog">
          <h1 className="h1-center">ꟻF</h1>
      

          <form onSubmit={this.handleSubmit} className="emailEr">
            <FormGroup className="topper" controlId="email" bsSize="large">
              <FormControl
                autoFocus
                type="email"
                placeholder="Email"
                value={this.email}
                onChange = { (event) => { this.state.email = event.target.value } }
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormControl
                value={this.password}
                placeholder="Password"
                onChange = { (event) => { this.state.password = event.target.value } }

                type="password"
              />
            </FormGroup>

            <Button style={{ backgroundColor: "orange", borderColor: "orange" }} block type="submit">
              Login
        </Button>

            <Modal show={this.state.isOpen} onHide={this.state.hideModal}>
              <Modal.Header>
                <Modal.Title>Uh oh!</Modal.Title>
              </Modal.Header>
              <Modal.Body>We couldn't log you in... try again!</Modal.Body>
              <Modal.Footer>
                <a style={{ "backgroundColor": "orange", "color": "white", "margin": "auto" }} type="button" class="reviewBut btn btn-outline-warning" onClick={this.hideModal}>Ok</a>
              </Modal.Footer>
            </Modal>

          </form>
          <div className="pStyle">
            <a className="aStl" href="signup">Don't have an account? <br></br> Sign up here!</a>
          </div>
        </div>


      </div>
    );
  }
}

export default withRouter(Login);