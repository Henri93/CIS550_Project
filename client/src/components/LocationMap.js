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
        console.log(typeof this.props.long);

        return (
            <GoogleMap
                ref={(map) => _map = map}
                defaultZoom={12}
                defaultCenter={{ lat: this.props.lat, lng: this.props.long }}
                defaultOptions={{ styles: mapStyles, draggable: false, mapTypeControl: false, streetViewControl: false }}
            >

                <Marker
                    position = {{ lat: this.props.lat, lng: this.props.long }} 
                    icon={{
                        url: 'https://www.pinclipart.com/picdir/big/174-1747068_vector-graphics-google-map-marker-green-clipart.png',
                        scaledSize: new window.google.maps.Size(27, 45)
                      }}
                ></Marker>

            </GoogleMap>
        );
    }
}

export default LocationMap;

