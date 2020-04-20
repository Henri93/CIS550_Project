
import React, { useState, useEffect } from "react";
import PageNavbar from '../components/Header';
import "../style/profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAlignLeft } from '@fortawesome/free-solid-svg-icons';



export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            onProfile: true,
            names: ["Hot", "Funny", "Profile", "Cute", "Writer"]
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

                    <hr className="newPageBreak"></hr>
                    <p onClick={this.toggleVisibility} className={this.state.onProfile ? 'profPHigh' : 'profP'}>My Profile</p>
                    <p onClick={this.toggleVisibility} className={this.state.onProfile ? 'compP' : 'compPHigh'}>Your Friends</p>


                    <div className={this.state.onProfile ? 'profileArea' : 'hidden'}>
                        <h3>Some info about you...</h3>

                        <div class="container">
                            <div class="row">

                                {this.state.names.map(name => (
                                    <div class="col-sm-3">
                                        <div class="card" style={{ "width": "18rem" }}>
                                            <div style={{ "height": "8vw" }} class="card-header">
                                                <span class="nameSpanForCard">{this.state.initial}</span>
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text">{name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>

                    <div className={this.state.onProfile ? 'hidden' : 'compArea'}>

                    </div>

                </div>
                <span class="nameSpan">{this.state.initial}</span>

            </div>
        );
    }
}