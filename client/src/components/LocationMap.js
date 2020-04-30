import React, { Component } from "react";

import {

    GoogleMap,
    Marker,
    withGoogleMap,
    withScriptjs,
} from "react-google-maps";
import mapStyles from "../style/mapStyles";


var _map;

class LocationMap extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GoogleMap
                ref={(map) => _map = map}
                defaultZoom={10}
                defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
                defaultOptions={{ styles: mapStyles, draggable: false, mapTypeControl: false, streetViewControl: false }}
            >

                <Marker
                    position = {{ lat: 45.4211, lng: -75.6903 }} 
                ></Marker>

            </GoogleMap>
        );
    }
}

export default LocationMap;

