
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
            userProfile: {},
            names: ["compliment_cool", "compliment_hot"
                , "compliment_more"
                , "compliment_profile"
                , "compliment_cute"
                , "compliment_list"
                , "compliment_note"
                , "compliment_plain"
                , "compliment_funny"
                , "compliment_writer"
                , "compliment_photos"],
            friends: ["Mike", "Sat", "Hort", "John", "mark", "Sa", "Fasd"]
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

        //get profile informatons
        fetch('/getProfile?id=' + this.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    //successful
                    console.log(data.profile)
                    this.setState({
                        userProfile: data.profile
                    });
                } else {
                    //display error msg
                    console.log("Fail to load profile!")
                }
            })
    }


    render() {
        return (
            <div>
                <div>
                    <PageNavbar active="My Profile" loggedInUser={this.props.loggedInUser} />
                </div>
                <div className="topPic">
                </div>
                <div className="floater">


                    <h1 className="bizTitle"> {this.state.username}</h1>

                    <div >
                        <FontAwesomeIcon style={{ "marginTop": "1vw", "display": "inline-block", "fontWeight": "100", "fontSize": "1.5em", "color": "orange" }} icon={faClock}></FontAwesomeIcon>
                        <p style={{ "display": "inline-block", "fontWeight": "100", "fontSize": "1.5em", "marginLeft": "0.3vw" }}> Yelping since: {this.state.userProfile.yelping_since !== null ? this.state.userProfile.yelping_since : "Jan 1, 2000"}</p>
                        <FontAwesomeIcon style={{ "display": "inline-block", "marginLeft": "2vw", "fontWeight": "100", "fontSize": "1.5em", "color": "orange" }} icon={faAlignLeft}></FontAwesomeIcon>
                        <p style={{ "display": "inline-block", "fontWeight": "100", "fontSize": "1.5em", "marginLeft": "0.3vw" }}> Reviews Left: {this.state.userProfile.review_count !== null ? this.state.userProfile.review_count : 0}</p>
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
                                    <div className={name == "compliment_note" ? 'col-sm-2 offset-sm-1' : 'col-sm-2'}>
                                        <span class="nameSpanProfile">{this.state.userProfile[name] !== null ? this.state.userProfile[name] : 0}</span>
                                        <p style={{ "marginTop": "6vw" }} >{name}</p>
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
                                        <a href = {"/profile/" + name} className="sideText">{name}</a>
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