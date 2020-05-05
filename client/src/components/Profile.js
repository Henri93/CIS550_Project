
import React, { useState, useEffect } from "react";
import PageNavbar from './Header';
import "../style/profile.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faAlignLeft } from '@fortawesome/free-solid-svg-icons';


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.getFriends = this.getFriends.bind(this);
        this.addFriend = this.addFriend.bind(this);

        this.state = {
            username: "",
            onProfile: true,
            isFriend: false,
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
                , "compliment_more": "Helpful"
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

    addFriend(e) {
        e.preventDefault();
        this.setState({
            isFriend: true
        });
        fetch('/addFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: this.props.loggedInUser.user_id, friend_id: this.state.userProfile.user_id })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {

                } else {
                    this.setState({
                        isFriend: false
                    });
                }
            });
    }

    getFriends(user_id) {
        fetch('/getFriends?id=' + user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    //successful
                    console.log("Friends:" + JSON.stringify(data.friends))
                    let elementsToRender = []
                    let friends = data.friends;
                    if (friends.length > 0) {
                        for (var i = 0; i < friends.length; i += 2) {
                            elementsToRender.push(
                                <tr>
                                    <td style={{ "width": "10%" }}>
                                        <div style={{ "fontSize": "3rem", }}>
                                            <p className="otherNameSpan">{friends[i].name.toUpperCase()[0]}</p>
                                        </div>
                                    </td>
                                    <td className="lefter">
                                        <a href={"/profile/" + friends[i].friends} className="tableText">{friends[i].name}</a>
                                    </td>
                                    {friends[i + 1] && [

                                        <td style={{ "width": "10%" }}>
                                            <div style={{ "fontSize": "3rem", }}>
                                                <p className="otherNameSpan">{friends[i + 1].name.toUpperCase()[0]}</p>
                                            </div>
                                        </td>,

                                        <td style={{ "textAlign": "left" }}>
                                            <a href={"/profile/" + friends[i + 1].friends} className="tableText">{friends[i + 1].name}</a>
                                        </td>
                                    ]
                                    }

                                </tr>
                            );

                        };
                    } else {
                        if (this.state.isThisMe) {
                            elementsToRender.push(
                                <h1 style={{ "marginBottom": "3vw", "fontWeight": "100" }}>Looks like you don't have any friends right now: try searching for them!</h1>
                            )
                        } else {
                            elementsToRender.push(
                            <h1 style={{ "marginBottom": "3vw", "fontWeight": "100" }}>Looks like this {this.state.username} doesn't have any friends right now....</h1>
                            )

                        }
                    }
                    this.setState({ friendsListTable: elementsToRender });
                } else {
                    //display error msg
                    console.log("Fail to load friends!")
                }
            })
    }

    componentDidMount() {


        this.user_id = (this.props.location.pathname.split('/')[2]);

        this.setState({ user_id: this.user_id, friendsListTable: elementsToRender });
        this.setState({ isThisMe: this.state.loggedInUserUserId == this.user_id });

        var elementsToRender = []
        if (this.state.isThisMe) {
            elementsToRender.push(
                <h1 style={{ "marginBottom": "3vw", "fontWeight": "100" }}>Looks like you don't have any friends right now: try searching for them!</h1>
            )
        } else {
            elementsToRender.push(
            <h1 style={{ "marginBottom": "3vw", "fontWeight": "100" }}>Looks like this {this.state.username} doesn't have any friends right now....</h1>
            )

        }

        //get profile informatons
        fetch('/getProfile?id=' + this.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    //successful
                    this.initial = data.profile.name.toUpperCase()[0];
                    this.setState({
                        userProfile: data.profile,
                        initial: this.initial,
                        username: data.profile.name
                    });
                } else {
                    //display error msg
                    console.log("Fail to load profile!")
                }
            }).then(data => {
                //then get friends after load profile
                this.getFriends(this.state.userProfile.user_id)
            })

        //cheek if loggedInUser has this person as a friend
        fetch('/isFriend?user_id=' + this.props.loggedInUser.user_id + "&friend_id=" + this.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    //successful
                    console.log("isFriend: " + data.isFriend)
                    this.setState({
                        isFriend: data.isFriend
                    });
                } else {
                    //display error msg
                    console.log("Fail to check if friend!")
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
                        <p style={{ "display": "inline-block", "fontWeight": "100", "fontSize": "1.5em", "marginLeft": "0.3vw" }}> Yelping since: {this.state.userProfile.yelping_since !== null ? (new Date(this.state.userProfile.yelping_since)).toDateString() : "Jan 1, 2000"}</p>
                        <FontAwesomeIcon style={{ "display": "inline-block", "marginLeft": "2vw", "fontWeight": "100", "fontSize": "1.5em", "color": "orange" }} icon={faAlignLeft}></FontAwesomeIcon>
                        <p style={{ "display": "inline-block", "fontWeight": "100", "fontSize": "1.5em", "marginLeft": "0.3vw" }}> Reviews Left: {this.state.userProfile.review_count !== null ? this.state.userProfile.review_count : 0}</p>
                    </div>

                    <a onClick={this.addFriend} id="reviewBut3" type="button" className={this.state.isFriend || this.state.isThisMe ? "hiddenBut3" : "btn btn-outline-warning"}>Send Friend Request</a>
                    {(!this.state.isFriend || !this.state.isThisMe) &&
                        <br></br>
                    }
                    <br></br>
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