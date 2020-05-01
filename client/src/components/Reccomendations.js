
import React, { useState, useEffect } from "react";
import PageNavbar from './Header';
import "../style/reccomendations.css"




export default class Reccomendations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            reccomendationsProfiles: [],
            mapToProfilesId: new Object,
            mapToReason: new Object
        };
    }

    componentDidMount() {
        this.username = this.props.loggedInUser.username;
        this.initial = this.username.toUpperCase()[0];
        const user_id = this.props.loggedInUser.user_id;
        var tempProfiles = [];
        var tempMap = new Object;
        var tempReason = new Object;

        console.log("trying to get recs for " + user_id);

        fetch('/reccomendations/'+user_id, {
            method: 'GET'
        }).then(res => {
            console.log(res);
        // Convert the response data to a JSON.
        return res.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        }).then(data => {
          if (!data) {return;}
          //to update state
            for(var i=0; i<data.recs.length; i++){
            tempProfiles.push(data.recs[i].name);
            tempMap[data.recs[i].name] = data.recs[i].friends;
            tempReason[data.recs[i].name] = data.recs[i].reason;
          }

          this.setState({
            reccomendationsProfiles: tempProfiles,
            mapToProfilesId: tempMap,
            mapToReason: tempReason
          });
        });

        this.setState({ username: this.username });
        this.setState({ initial: this.initial });
    }
    render() {
        return (
            <div>
                <div >
                    <PageNavbar active="Reccomendations" loggedInUser={this.props.loggedInUser} />
                </div>
                <div className="topPic">
                </div>
                <div className="floater">
                    <p className="recTitle">{this.state.username}, based on your activity, we reccomend you check out the following people:</p>
                    <br></br>
                    <div style={{"marginBottom":"5vw"}} class="container">
                        <div class="row">

                            {this.state.reccomendationsProfiles.map(profile => (
                                <div class="col-sm-4">
                                    <div class="card" style={{ "width": "18rem" }}>
                                        <div style={{ "height": "10vw" }} class="card-header">
                                            <span class="nameSpanForCard">{profile.toUpperCase()[0]}</span>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text"><b>{profile}</b> {this.state.mapToReason[profile]}</p>
                                            <a style={{"backgroundColor":"orange", "color":"white"}}type="button" class="btn btn-warning" href = {"/profile/" + this.state.mapToProfilesId[profile]} >Go to {profile + "'s"}  profile</a>
                                        </div>
                                    </div>
                                </div>
                            ))}




                        </div>
                    </div>
                </div>
                <span class="nameSpan">{this.state.initial}</span>

            </div >
        );
    }
}