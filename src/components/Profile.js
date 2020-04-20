
import React, { useState, useEffect } from "react";
import PageNavbar from '../components/Header';
import "../style/profile.css"




export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            onProfile: true
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
                <div >
                    <PageNavbar active="My Profile" />
                </div>
                <div className="topPic">
                </div>
                <div className="floater">


                    <h1 className="bizTitle"> {this.state.username}</h1>
                    <p onClick={this.toggleVisibility} className={this.state.onProfile ? 'profPHigh' : 'profP'}>My Profile</p>
                    <p onClick={this.toggleVisibility}  className={this.state.onProfile ? 'compP' : 'compPHigh'}>Compliments</p>

                    <div className={this.state.onProfile ? 'profileArea' : 'hidden'}>

                    </div>

                    <div className={this.state.onProfile ? 'hidden' : 'compArea'}>

                    </div>

                </div>
                <span class="nameSpan">{this.state.initial}</span>

            </div>
        );
    }
}