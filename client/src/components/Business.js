
import React, { useState, useEffect } from "react";
import PageNavbar from './Header';
import "../style/business.css"
import StarRatings from 'react-star-ratings';


export default class Business extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            business: {},
            reviews: []
        };
    }

    componentDidMount() {

        //get the business id

        //load businesses information
        let businessID = (this.props.location.pathname.split('/')[2]);
        fetch('/getBusinessesInfo?id='+businessID, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                //successful
                var bizInitial = data.business.name.toUpperCase()[0];
                var categories = data.business.categories.replace(";"," ");
                this.setState({
                    business: data.business,
                    bizInitial: bizInitial,
                    categories: categories
                });

                
                console.log(bizInitial);
                }else{
                    //display error msg
                    console.log("Fail to load business info")
                }
        })

        //load first 10 reviews sorted by date
        fetch('/getReviews?id='+businessID, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
            }})
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                //successful
                console.log("Reviews: " + data.reviews)
                this.setState({
                    reviews: data.reviews
                });
                }else{
                    //display error msg
                    console.log("Fail to load reviews ofr business")
                }
        })
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

                    <h1 className="bizTitle"> {this.state.business.name}</h1>
                    <StarRatings
                        rating={2.43}
                        starRatedColor="orange"
                        numberOfStars={this.state.business.stars}
                        starDimension="25px"
                        starSpacing="2px"
                        name='rating'
                    />
                    <p className = "numberOfReviews">{this.state.business.review_count} Reviews</p>
                    <p className = "cats">{this.state.categories}</p>
                    <a href={"/review/" + this.state.business.name} type="button" class="reviewBut btn btn-outline-warning">Leave a review</a>
                    <hr className = "pageBreak"></hr>
                    <p className = "cats">{this.state.business.address}<br /> {this.state.business.city + ", " + this.state.business.state}</p>
                    <h2>Location</h2>
                    <hr className = "pageBreak"></hr>
                    <h2>Reviews</h2>



                </div>
                <span class="nameSpan">{this.state.bizInitial}</span>

            </div>
        );
    }
}