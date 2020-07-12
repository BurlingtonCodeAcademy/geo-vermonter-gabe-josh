import React from "react";
import { Map, TileLayer, Polygon } from "react-leaflet";
import borderData from "./Components/border.js";


class VTMap extends React.Component {
  getCorners = (geoJson) => {
    geoJson.geometry.coordinates[0].map((coordArray) => {
      return coordArray;
    });
  };

  render() {
    this.getCorners(borderData);

    let vtBorder = borderData.geometry.coordinates[0].map((coordSet) => {
      return [coordSet[1], coordSet[0]];
    });

    return (
      <Map
        center={this.props.coords}
        style={{ height: "600px", width: "600px" }}
        zoom={this.props.zoom}
        onClick={this.addMarker}
        dragging={false} zoomControl={false} scrollWheelZoom={false} touchZoom={false} doubleClickZoom={false}

      >
        {/* Tilelayer sets the style of map */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        ></TileLayer>
        <Polygon positions={vtBorder} />
      </Map>
    );
  }
}

export default VTMap;

export { Polygon };
