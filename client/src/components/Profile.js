
import React, { useState, useEffect } from "react";
import PageNavbar from './Header';
import "../style/profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAlignLeft } from '@fortawesome/free-solid-svg-icons';



export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            onProfile: true,
            names: ["Hot", "Funny", "Profile", "Cute", "Writer"],
            friends: ["Mike", "Sat", "Hort"]
        };


    }

    toggleVisibility = () => {
        this.setState({ onProfile: !this.state.onProfile });
        console.log(this.state.onProfile)

    };

    componentDidMount() {

        this.initial = (this.props.location.pathname.split('/')[2]).toUpperCase()[0];
        this.username = (this.props.location.pathname.split('/')[2]);

        this.setState({ username: this.username });
        this.setState({ initial: this.initial });
    }
    render() {
        return (
            <div>
                <div>
                    <PageNavbar active="My Profile" />
                </div>
                <div className="topPic">
                </div>
                <div className="floater">


                    <h1 className="bizTitle"> {this.state.username}</h1>

                    <div >
                        <FontAwesomeIcon style={{ "marginTop": "1vw", "display": "inline-block", "fontWeight": "100", "fontSize": "1.5em", "color": "orange" }} icon={faClock}></FontAwesomeIcon>
                        <p style={{ "display": "inline-block", "fontWeight": "100", "fontSize": "1.5em", "marginLeft": "0.3vw" }}> Yelping since: March 3, 2015</p>
                        <FontAwesomeIcon style={{ "display": "inline-block", "marginLeft": "2vw", "fontWeight": "100", "fontSize": "1.5em", "color": "orange" }} icon={faAlignLeft}></FontAwesomeIcon>
                        <p style={{ "display": "inline-block", "fontWeight": "100", "fontSize": "1.5em", "marginLeft": "0.3vw" }}> Reviews Left: 500</p>
                    </div>

                    <p onClick={this.toggleVisibility} className={this.state.onProfile ? 'profPHigh' : 'profP'}>My Profile</p>
                    <p onClick={this.toggleVisibility} className={this.state.onProfile ? 'compP' : 'compPHigh'}>Your Friends</p>


                    <div className={this.state.onProfile ? 'profileArea' : 'hidden'}>
                        <br></br>
                        <h3>What people are saying about you...</h3>
                        <br></br>

                        <div class="container">
                            <div class="row">

                                {this.state.names.map(name => (
                                    <div class="col-sm-2">
                                        <span class="nameSpanProfile">100</span>
                                        <p >{name}</p>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>

                    <div className={this.state.onProfile ? 'hidden' : 'compArea'}>
                        
                    <div class="container">
                            <div class="row">

                                {this.state.friends.map(name => (
                                    <div class="col-sm-3">
                                        <span class="nameSpanProfile2">{name.toUpperCase()[0]}</span>
                                        <p className="sideText">{name}</p>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>

                </div>
                <span class="nameSpan">{this.state.initial}</span>

            </div>
        );
    }
}