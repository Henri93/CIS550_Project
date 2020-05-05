
import React, { useState, useEffect } from "react";
import PageNavbar from './Header';
import "../style/review.css"
import StarRatings from 'react-star-ratings';
import { Button, Modal } from 'react-bootstrap'

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.changeRating = this.changeRating.bind(this);
        this.changeReviewText = this.changeReviewText.bind(this);

        this.state = {
            businessName: "",
            modalTitle: "Congratulations!",
            modalText: "Your review has been submitted!",
            setIsOpen: false,
            isOpen: false,
            business: {},
            rating: 0,
            reviewText: ""
        };
    }


    showModal = () => {
        //submit the review and show the success modal
        fetch('/submitReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: this.state.rating, reviewText: this.state.reviewText,
                business_id: this.state.business.business_id,
                user_id: this.props.loggedInUser.user_id
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    //successful login so redirect to homepage
                    this.setState({ isOpen: true, modalTitle: "Congratulations!", modalText: "Your review has been submitted!" });
                } else {
                    //display error login msg
                    this.setState({ isOpen: true, modalTitle: "Epic Fail", modalText: data.err });
                }
            });
    };

    hideModal = () => {
        this.setState({ isOpen: false });
    };

    componentDidMount() {

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
                    var bizInitial = data.business.name.toUpperCase()[0];

                    this.setState({
                        business: data.business,
                        bizInitial: bizInitial,
                        businessName: data.business.name
                    });
                } else {
                    //display error msg
                    console.log("Fail to load business info")
                }
            })

    }

    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
    }

    changeReviewText(e) {
        this.setState({ reviewText: e.target.value });
    }

    render() {
        return (
            <div>
                <div >
                    <PageNavbar active="dashboard" loggedInUser={this.props.loggedInUser} />
                </div>
                <div className="topPic">
                </div>
                <div className="floater">
                    <div style={{ "marginBottom":"3.4vw"}} className="content">
                        <h1 className="bizTitle"> Leave a review for {this.state.businessName}</h1>
                        <p className="yourRate">Your Rating: </p>
                        <div style={{ "marginLeft": "0.8rem", "marginTop": ".9rem", "display": "inline-block" }}>
                            <StarRatings
                                rating={this.state.rating}
                                marginTop="1.5rem"
                                numberOfStars={5}
                                starDimension="1.9rem"
                                starSpacing="0.1rem"
                                starHoverColor="orange"
                                starRatedColor="orange"

                                changeRating={this.changeRating}
                                name='rating'
                            />
                        </div>
                        <br></br>
                        <textarea className="reviewBox" value={this.state.reviewText} onChange={this.changeReviewText}>
                        </textarea>
                        <br></br>
                        <a onClick={this.showModal} style={{ "backgroundColor": "orange", "color": "white" }} type="button" class="reviewBut btn btn-outline-warning">Submit your review!</a>
                        <Modal show={this.state.isOpen} onHide={this.hideModal}>
                            <Modal.Header>
                                <Modal.Title>{this.state.modalTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{this.state.modalText}</Modal.Body>
                            <Modal.Footer>
                                <a style={{ "backgroundColor": "orange", "color": "white", "margin": "auto" }} href={"/business/" + this.state.business.business_id} type="button" class="reviewBut btn btn-outline-warning" onClick={this.hideModal}>Awesome!</a>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>
                <span class="nameSpan">{this.state.businessName[0]}</span>

            </div>
        );
    }
}