import LeafletPip from 'leaflet-pip';
import borderData from './border.js';
import L from 'leaflet'

// max north, max south, max east, and max west are pulled from coordinates array in borderData JSOn object (border.js)
let x_max = -71.51022535353107 // max long
let x_min = -73.42613118833583 // min long
let y_max = 42.730315121762715 // max lat
let y_min = 45.007561302382754 // min lat

// generates a random point inside of our max and min lat and long, uses leaflet-pip to test if the point is inside of the polygon
function PointGenerator() {
        let randomLat = y_min + (Math.random() * (y_max - y_min))
        let randomLong = x_min + (Math.random() * (x_max - x_min));

        let results = LeafletPip.pointInLayer([randomLong, randomLat], L.geoJSON(borderData))
//recursive function, gets called until var "results" evalutes to true, indicating that the point is inside of the Polygon (Vermont)
        let point = results.length > 0 ? [randomLat, randomLong] : PointGenerator()
        return point;
}

export default PointGenerator;