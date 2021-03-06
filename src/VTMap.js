import React from "react";
import { Map, TileLayer, Polygon, Marker, Polyline } from "react-leaflet";
import borderData from "./Components/borderData.js";


class VTMap extends React.Component {
  //get the data to use for the corners of the map
  getCorners = (geoJson) => {
    geoJson.geometry.coordinates[0].map((coordArray) => {
      return coordArray;
    });
  };

  render() {
    //pulls corner coords from borderData object in border.js
    this.getCorners(borderData);

//maps over the points of Vermont's border for use in our polygon
    let vtBorder = borderData.geometry.coordinates[0].map((coordSet) => {
      return [coordSet[1], coordSet[0]];
    });

    return (
      <Map
        center={this.props.coords}
        style={{ height: "500px", width: "500px" }}
        zoom={this.props.zoom}
        onClick={this.addMarker}
        dragging={false} zoomControl={false} scrollWheelZoom={false} touchZoom={false} doubleClickZoom={false}
      >
        {/* Tilelayer sets the style of map */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        ></TileLayer>
        <Polygon color={'white'} positions={vtBorder} />
    {/* Marker is always in the center of the map */}
      <Marker position={this.props.coords} />
      <Polyline positions={this.props.latLngArray} />
      </Map>
    );
  }
}

export default VTMap;

export { Polygon };
