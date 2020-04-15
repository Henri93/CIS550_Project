import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";
  import * as parkData from "../data/skate.json";
  import mapStyles from "../style/mapStyles";

  import React, { useState, useEffect } from "react";
  import "../style/markerWindowStyles.css"

  import PageNavbar from '../components/Header';
  import StarRatings from 'react-star-ratings';
  import {
    BrowserRouter as Router,
    useParams
  } from "react-router-dom";


function MapCreator() {
  const [selectedPark, setSelectedPark] = useState(null);
  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
      defaultOptions={{ styles: mapStyles }}
    >
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
          
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
          style = {{backgroundColor: "red"}}
        >
          <div style={{"textAlign" : "center"}}> 
            <a className = "businessLink" href = {"/business/" + selectedPark.properties.NAME}>{selectedPark.properties.NAME}</a>
            <br></br>
            <StarRatings
              rating={2.43}
              starRatedColor="red"
              numberOfStars={5}
              starDimension="25px"
              starSpacing="2px"
              name='rating'
            />
            <p>{selectedPark.properties.DESCRIPTIO}</p>
            {/* <p>   name, categories, review_count, stars</p> */}
           
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(MapCreator));



export default function Map() {
    return (
      <div style={{ width: "100vw", height: "94vh" }}>
            <PageNavbar active="dashboard" />
  
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            process.env.REACT_APP_GOOGLE_KEY
          }`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }