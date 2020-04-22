import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";
  import mapStyles from "../style/mapStyles";

  import React, { useState, useEffect } from "react";
  import "../style/markerWindowStyles.css"

  import PageNavbar from './Header';
  import StarRatings from 'react-star-ratings';

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

  var _map;

class MapCreator extends React.Component {
    
    constructor(props) {
      super(props);
      this.updateBusinesses = this.updateBusinesses.bind(this);
      this.getBusinesses = this.getBusinesses.bind(this);
      this.state = {
        businesses: [],
        selectedPark: null
      };
    }

    getBusinesses(lat1, lng1, lat2, lng2){
      fetch('/getHomeBusinesses?lat1='+lat1+'&lng1='+lng1+'&lat2='+lat2+'&lng2='+lng2, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        }})
        .then(response => response.json())
        .then(data => {
          if(data.success) {
            //successful
            console.log(data.businesses)
            this.setState({
              businesses: data.businesses
            });
            
          }else{
            //display error msg
            console.log("Fail to load businesses")
          }
      })
    }

    componentDidMount() {
      const listener = e => {
        if (e.key === "Escape") {
          this.setState({
            selectedPark: null
          });
        }
      };
      window.addEventListener("keydown", listener);

      this.getBusinesses(45.07448420198623, -77.008659375, 45.75410365243435, -74.371940625)
    }

    updateBusinesses() {
      //only update businesses when scrolling on high zooms
      if(_map.getZoom() >= 10){
        let bounds = JSON.parse(JSON.stringify(_map.getBounds()))
        console.log('update ' + JSON.stringify(bounds))
        this.getBusinesses(bounds.north, bounds.west, bounds.south, bounds.east)
      }
    }

    render() {
      return (
        <GoogleMap
          ref={(map) => _map = map}
          defaultZoom={10}
          defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
          defaultOptions={{ styles: mapStyles }}
          onDragEnd={this.updateBusinesses}
        >
    
          { 
          this.state.businesses.map(park => (
            <Marker
              key={park.business_id}
              position={{
                lat: park.longitude,
                lng: park.latitude
              }}
              onClick={() => {
                this.setState({
                  selectedPark: park
                });
              }}
              icon={{
              
                scaledSize: new window.google.maps.Size(25, 25)
              }}
            />
          ))
          }
    
          {this.state.selectedPark && (
            <InfoWindow
              onCloseClick={() => {
                this.setState({
                  selectedPark: null
                });
              }}
              position={{
                lat: this.state.selectedPark.longitude,
                lng: this.state.selectedPark.latitude
              }}
              style = {{backgroundColor: "red"}}
            >
              <div style={{"textAlign" : "center"}}> 
                <a className = "businessLink" href = {"/business/" + this.state.selectedPark.name}>{this.state.selectedPark.name}</a>
                <br></br>
                <StarRatings
                  rating={this.state.selectedPark.stars}
                  starRatedColor="red"
                  numberOfStars={5}
                  starDimension="25px"
                  starSpacing="2px"
                  name='rating'
                />
                <p>{this.state.selectedPark.neighborhood}</p>
                {/* <p>   name, categories, review_count, stars</p> */}
               
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      );
    }
}

const MapWrapped = withScriptjs(withGoogleMap(MapCreator));

export default function Map() {
  return (
    <div style={{ width: "100vw", height: "94vh" }}>
          <PageNavbar hide_search={false} active="Map" />

      { <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAi8On2sh9wpXhquXfaDcdpMl_JmDbhBO0`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      /> }
    </div>
  );
}