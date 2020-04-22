
import React, { useState, useEffect } from "react";
import PageNavbar from '../components/Header';
import "../style/business.css"
import StarRatings from 'react-star-ratings';


export default class Business extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            businessName: ""
        };


    }

    componentDidMount() {

        this.businessName = (this.props.location.pathname.split('/')[2]);
        this.setState({ businessName: this.businessName });

    }



    render() {
        return (
            <div>
                <div >
                    <PageNavbar active="dashboard" />
                </div>
                <div className="topPic">
                </div>
                <div className="floater">

                    <h1 className="bizTitle"> {this.state.businessName}</h1>
                    <StarRatings
                        rating={2.43}
                        starRatedColor="orange"
                        numberOfStars={5}
                        starDimension="25px"
                        starSpacing="2px"
                        name='rating'
                    />
                    <p className = "numberOfReviews">500 Reviews</p>
                    <p className = "cats">A diner in Bellingham</p>
                    {/* <p className = "cats">Bellingham</p> */}
                    <a href={"/review/" + this.state.businessName} type="button" class="reviewBut btn btn-outline-warning">Leave a review</a>
                    <hr className = "pageBreak"></hr>
                    <h2>Location</h2>
                    <hr className = "pageBreak"></hr>
                    <h2>Reviews</h2>



                </div>
                <span class="nameSpan">{this.state.businessName[0]}</span>

            </div>
        );
    }
}