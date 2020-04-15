
import React, { useState, useEffect } from "react";
import PageNavbar from '../components/Header';
import "../style/profile.css"




export default class Review extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ""
        };


    }

    componentDidMount() {

        this.username = (this.props.location.pathname.split('/')[2]).toUpperCase();
        this.setState({ username: this.username });

    }
    render() {
        return (
            <div>
                <div >
                    <PageNavbar active="dashboard" />
                </div>
                <div className="topPic">
                </div>
                <div className="floater">      </div>
                <span class="nameSpan">{this.state.username[0]}</span>

            </div>
        );
    }
}