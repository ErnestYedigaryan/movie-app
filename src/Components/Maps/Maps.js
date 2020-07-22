import React from "react";
import L from "leaflet";
import {Map, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const styles = {
    Map: {
        maxHeight: "300px",
        minHeight: "200px"
    }
}

var myIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

const Maps = (props) => {

    return(
        <Map style={styles.Map} center={[props.location.lat, props.location.lng]} zoom={10} style={{height: "100%", width: "100%"}}>

            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

        </Map>
    )
}

export default Maps;