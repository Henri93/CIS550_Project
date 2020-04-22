
import React, { useState, useEffect } from "react";
import PageNavbar from './Header';
import "../style/review.css"
import StarRatings from 'react-star-ratings';
import { Button, Modal } from 'react-bootstrap'

export default class Review extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            businessName: "",
            setIsOpen: false,
            isOpen: false
        };



    }


    showModal = () => {
        this.setState({ isOpen: true });

    };

    hideModal = () => {
        this.setState({ isOpen: false });
    };

    componentDidMount() {

        this.businessName = (this.props.location.pathname.split('/')[2]);
        this.setState({ businessName: this.businessName });

    }

    changeRating(newRating, name) {
        this.setState({
            rating: newRating
        });
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
                    <h1 className="bizTitle"> Leave a review for {this.state.businessName}</h1>
                    <p className="yourRate">Your Rating: </p>
                    <div style ={{"marginLeft":"0.8rem","marginTop":".9rem","display":"inline-block"}}>
                        <StarRatings
                            rating={0}
                            marginTop="1.5rem"
                            numberOfStars={5}
                            starDimension="1.9rem"
                            starSpacing="0.1rem"
                            starRatedColor="orange"

                            changeRating={this.changeRating}
                            name='rating'
                        />
                    </div>
                    <br></br>
                    <textarea className="reviewBox">
                    </textarea>
                    <br></br>
                    <a onClick={this.showModal} style={{ "backgroundColor": "orange", "color": "white" }} type="button" class="reviewBut btn btn-outline-warning">Submit your review!</a>
                    <Modal show={this.state.isOpen} onHide={this.hideModal}>
                        <Modal.Header>
                            <Modal.Title>Congratulations!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Your review has been submitted!</Modal.Body>
                        <Modal.Footer>
                            <a style={{ "backgroundColor": "orange", "color": "white", "margin": "auto" }} href={"/business/" + this.state.businessName} type="button" class="reviewBut btn btn-outline-warning" onClick={this.hideModal}>Awesome!</a>
                        </Modal.Footer>
                    </Modal>


                </div>
                <span class="nameSpan">{this.state.businessName[0]}</span>

            </div>
        );
    }
}