
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
            mapToReason: new Object,
            reccomendationsPlacesProfiles: [],
            mapToProfilesIdPlaces: new Object,
            mapToReasonPlaces: new Object,
            onProfile: true
        };
    }

    toggleVisibility = () => {
        this.setState({ onProfile: !this.state.onProfile });

    };

    getPlaces(user_id){
        var tempProfilesPlaces = [];
        var tempMapPlaces = new Object;
        var tempReasonPlaces = new Object;
        fetch('/reccomendations_p/'+user_id, {
            method: 'GET'
        })
        .then(result => {
            console.log(result);
            // Convert the response data to a JSON.
            return result.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        })
        .then(datap => {
          if (!datap) return;
          //to update state
            for(var i=0; i<datap.recs.length; i++){
            tempProfilesPlaces.push(datap.recs[i].name);
            tempMapPlaces[datap.recs[i].name] = datap.recs[i].business;
            tempReasonPlaces[datap.recs[i].name] = datap.recs[i].reason;
          }
          console.log(datap.recs)

          this.setState({
            reccomendationsPlacesProfiles: tempProfilesPlaces,
            mapToProfilesIdPlaces: tempMapPlaces,
            mapToReasonPlaces: tempReasonPlaces
          });
        });
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
        })
        .then(res => {
            console.log(res);
            // Convert the response data to a JSON.
            return res.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        })
        .then(data => {
          if (!data) return;
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
        })
        .then(data => {
            //then get places after friends
            this.getPlaces(user_id)
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

                    <p onClick={this.toggleVisibility} style={{ "marginTop": "7vw" }} className={this.state.onProfile ? 'profPHigh' : 'profP'}>People</p>
                    <p onClick={this.toggleVisibility} className={this.state.onProfile ? 'compP' : 'compPHigh'}>Places</p>


                    <div className={this.state.onProfile ? 'profileArea' : 'hidden'}>
                        <p className="recTitle">{this.state.username}, based on your activity, we recommend you check out the following people:</p>
                        <br></br>
                        <div style={{ "marginBottom": "5vw" }} class="container">
                            <div class="row">

                                {this.state.reccomendationsProfiles.map(profile => (
                                    <div class="col-sm-4">
                                        <div class="card" style={{ "width": "18rem" }}>
                                            <div style={{ "height": "10vw" }} class="card-header">
                                                <span class="nameSpanForCard">{profile.toUpperCase()[0]}</span>
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text"><b>{profile}</b> {this.state.mapToReason[profile]}</p>
                                                <a style={{ "backgroundColor": "orange", "color": "white" }} type="button" class="btn btn-warning" href={"/profile/" + this.state.mapToProfilesId[profile]} >Go to {profile + "'s"}  profile</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}




                            </div>
                        </div>
                    </div>

                    <div className={this.state.onProfile ? 'hidden' : 'compArea'}>

                        <p className="recTitle">{this.state.username}, based on your activity, we reccomend you check out the following places:</p>
                        <br></br>
                        <div style={{ "marginBottom": "5vw" }} class="container">
                            <div class="row">

                                {this.state.reccomendationsPlacesProfiles.map(profile => (
                                    <div class="col-sm-4">
                                        <div class="card" style={{ "width": "18rem" }}>
                                            <div style={{ "height": "10vw" }} class="card-header">
                                                <span class="nameSpanForCard">{profile.toUpperCase()[0]}</span>
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text"><b>{profile}</b> {this.state.mapToReasonPlaces[profile]}</p>
                                                <a style={{ "backgroundColor": "orange", "color": "white" }} type="button" class="btn btn-warning" href={"/business/" + this.state.mapToProfilesIdPlaces[profile]} >Go to {profile + "'s"}  page</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}




                            </div>
                        </div>


                    </div>



                </div>
                <span class="nameSpan">{this.state.initial}</span>

            </div >
        );
    }
}