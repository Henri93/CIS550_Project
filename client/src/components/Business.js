
import React, { useState, useEffect } from "react";
import PageNavbar from './Header';
import "../style/business.css"
import StarRatings from 'react-star-ratings';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import LocationMap from "../components/LocationMap"

const MapWrapped = withScriptjs(withGoogleMap(LocationMap));


export default class Business extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            business: {},
            reviews: [],
            anyt: [1, 2, 3, 4, 5, 6, 7],
            limiter: 2,
            hideLoadMore: false
        };

        this.loadMore = this.loadMore.bind(this);



    }

    componentDidMount() {

        //get the business id

        //load businesses information
        let businessID = (this.props.location.pathname.split('/')[2]);
        fetch('/getBusinessesInfo?id=' + businessID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    //successful
                    console.log(data.business)
                    var bizInitial = data.business.name.toUpperCase()[0];
                    var categories = data.business.categories.replace(";", " ");
                    this.setState({
                        business: data.business,
                        bizInitial: bizInitial,
                        categories: categories
                    });


                    console.log(bizInitial);
                } else {
                    //display error msg
                    console.log("Fail to load business info")
                }
            })

        //load first 10 reviews sorted by date
        fetch('/getReviews?id=' + businessID, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    //successful
                    console.log("Reviews")
                    console.log(data.reviews)
                    this.setState({
                        reviews: data.reviews
                    });
                    if (this.state.reviews.length < 3) {
                        this.setState({
                            hideLoadMore: true
                        });
                    }
                } else {
                    //display error msg
                    console.log("Fail to load reviews ofr business")
                }
            })




    }


    loadMore() {

        var limit = this.state.limiter + 2;
        this.setState({
            limiter: limit
        });
        if (limit >= this.state.reviews.length) {
            this.setState({
                hideLoadMore: true
            });
        }
    }


    render() {
        return (
            <div>
                <div >
                    <PageNavbar active="dashboard" loggedInUser={this.props.loggedInUser} />
                </div>
                <div className="topPic">
                </div>
                <div className="bizFloater">

                    <h1 className="bizTitle"> {this.state.business.name}</h1>
                    <StarRatings
                        rating={this.state.business.stars}
                        starRatedColor="orange"
                        numberOfStars={5}
                        starDimension="25px"
                        starSpacing="2px"
                        name='rating'
                    />
                    <p className="numberOfReviews">{this.state.business.review_count} Reviews</p>
                    <p className="cats">{this.state.categories}</p>
                    <a href={"/review/" + this.state.business.business_id} type="button" className="reviewBut btn btn-outline-warning">Leave a review</a>
                    <hr className="pageBreak"></hr>
                    <h2>Location</h2>
                    <br></br>
                    <div className="card" style={{ "margin": "auto", "width": "25vw" }}>
                        <div style={{ "height": "14vw" }} className="card-header">
                            {<MapWrapped
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAi8On2sh9wpXhquXfaDcdpMl_JmDbhBO0`}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                lat={this.state.business.latitude}
                                long={this.state.business.longitude}
                            />}
                        </div>
                        <div className="card-body">
                            <p className="card-text">{this.state.business.address}<br /> {this.state.business.city + ", " + this.state.business.state}</p>
                            <a target="_blank" style={{ "backgroundColor": "orange", "color": "white" }} href="https://www.google.com/maps/dir/?api=1&destination=292+McArthur+Avenue+Vanier+ON" type="button" className="btn btn-warning">Directions</a>
                        </div>
                    </div>

                    <hr className="pageBreak"></hr>
                    <h2>Reviews</h2>
                    <div className="tableDiv">
                        <table cellSpacing="0" cellPadding="0" style={{ "margin": "auto", "marginLeft": "15%", "marginTop": "1vw", "width": "80%", "wordBreak": "break-all" }} class="table table-bordered">
                            <tbody>
                                {this.state.reviews.slice(0, this.state.limiter).map(review => (
                                    <tr>
                                        <td className="righter">
                                            <div style={{ "fontSize": "1rem", }}>
                                                <p className="otherNameSpan2">{review.name.toUpperCase()[0]}</p>
                                                <p className = "userInfoText"> {review.name}
                                                    <br></br>
                                                    {review.review_count} Reviews
                                            <br></br>
                                                    {review.average_stars} Average Rating
                                            </p>

                                            </div>
                                        </td>
                                        <td className="lefter">
                                            <StarRatings
                                                rating={review.stars}
                                                starRatedColor="orange"
                                                numberOfStars={5}
                                                starDimension="35px"
                                                starSpacing="2px"
                                                name='rating'
                                            />
                                            <p href={"/profile/"} className="dateText">{(new Date(review.date)).toDateString()}</p>
                                            <p className="reviewText">
                                                {review.text}

                                            </p>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                        <a onClick={this.loadMore} id="loadMoreBut" type="button" className={this.state.hideLoadMore ? "hiddenText" : "btn btn-warning"} >Load More</a>

                    </div>


                </div>
                <span className="nameSpan">{this.state.bizInitial}</span>

            </div>
        );
    }
}