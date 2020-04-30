
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
            loggedInUserUserId: props.loggedInUser.user_id,
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
            mapToName: {
                "compliment_cool": "Cool", "compliment_hot": "Hot"
                , "compliment_more": "More"
                , "compliment_profile": "Profile"
                , "compliment_cute": "Cute"
                , "compliment_list": "Awesome"
                , "compliment_note": "Great Note"
                , "compliment_plain": "Cool Profile"
                , "compliment_funny": "Funny"
                , "compliment_writer": "Good Writer"
                , "compliment_photos": "Great Photos"
            }
        };


    }

    toggleVisibility = () => {
        this.setState({ onProfile: !this.state.onProfile });
        console.log(this.state.onProfile)

    };

    componentDidMount() {


        var friends = ["Mike@Mike.com", "Sat", "Hort", "johnsaintmarksa@asdasd.com", "mark", "Sa", "Fasd"];
        var elementsToRender = []
        if (friends.length > 0) {
            for (var i = 0; i < friends.length; i += 2) {
                elementsToRender.push(
                    <tr>
                        <td className="righter">
                            <div style={{ "fontSize": "3rem", }}>
                                <p className="otherNameSpan">{friends[i].toUpperCase()[0]}</p>
                            </div>
                        </td>
                        <td className="lefter">
                            <a href={"/profile/" + friends[i]} className="tableText">{friends[i]}</a>
                        </td>
                        {friends[i + 1] && [

                            <td className="righter">
                                <div style={{ "fontSize": "3rem", }}>
                                    <p className="otherNameSpan">{friends[i + 1].toUpperCase()[0]}</p>
                                </div>
                            </td>,

                            <td className="lefter">
                                <a href={"/profile/" + friends[i + 1]} className="tableText">{friends[i + 1]}</a>
                            </td>
                        ]
                        }

                    </tr>
                );

            };
        } else {
            elementsToRender.push(

                <h1 style={{"marginBottom":"3vw", "fontWeight":"100"}}>Looks like you don't have any friends right now: try searching for them!</h1>
            )
        }


        this.initial = (this.props.location.pathname.split('/')[2]).toUpperCase()[0];
        this.username = (this.props.location.pathname.split('/')[2]);

        this.setState({ username: this.username, friendsListTable: elementsToRender });
        this.setState({ initial: this.initial });
        this.setState({ isThisMe: this.state.loggedInUserUserId == this.username });

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

                    <p onClick={this.toggleVisibility} className={this.state.onProfile ? 'profPHigh' : 'profP'}>{this.state.isThisMe ? 'My' : this.state.username + "'s"} Profile</p>
                    <p onClick={this.toggleVisibility} className={this.state.onProfile ? 'compP' : 'compPHigh'}>{this.state.isThisMe ? 'My' : this.state.username + "'s"}  Friends</p>


                    <div className={this.state.onProfile ? 'profileArea' : 'hidden'}>
                        <br></br>
                        <h3>What people are saying about {this.state.isThisMe ? 'you' : this.state.username} ...</h3>
                        <br></br>

                        <div class="container">
                            <div class="row">

                                {this.state.names.map(name => (
                                    <div className={name == "compliment_note" ? 'col-sm-2 offset-sm-1' : 'col-sm-2'}>
                                        <span class="nameSpanProfile">{this.state.userProfile[name] !== null ? this.state.userProfile[name] : 0}</span>
                                        <p style={{ "marginTop": "6vw" }} >{this.state.mapToName[name]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={this.state.onProfile ? 'hidden' : 'compArea'}>

                        <table cellspacing="0" cellpadding="0" style={{ "margin": "auto", "marginTop": "1vw", "width": "80%", "wordBreak": "break-all" }} class="table table-bordered">
                            <tbody>
                                {this.state.friendsListTable}
                            </tbody>
                        </table>


                    </div>


                </div>
                <span class="nameSpan">{this.state.initial}</span>

            </div>
        );
    }
}