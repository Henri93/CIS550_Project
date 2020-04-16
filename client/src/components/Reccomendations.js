
import React, { useState, useEffect } from "react";
import PageNavbar from './Header';
import "../style/reccomendations.css"




export default class Reccomendations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };


    }

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
                    <PageNavbar active="Reccomendations" />
                </div>
                <div className="topPic">
                </div>
                <div className="floater">


                    <h1 className="bizTitle"> {this.state.username}</h1>


                </div>
                <span class="nameSpan">{this.state.initial}</span>

            </div>
        );
    }
}