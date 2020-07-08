import React from 'react'
import {Map, TileLayer, Polygon} from 'react-leaflet'
import borderData from './border.js'

class VTMap extends React.Component{
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Map center={[44.0886, -72.7317]} style={{height: '600px', width: '600px'}} zoom={8}>
                <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'></TileLayer>

                <Polygon positions={borderData.geometry.coordinates[0].map(coordSet => {
                    return [coordSet[1], coordSet[0]]
                })} />
            </Map>
        )
    }
}


export default VTMap;