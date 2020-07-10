// import React from 'react'
import LeafletPip from 'leaflet-pip';
import borderData from './border.js';
import L from 'leaflet'

// get max north, max south, max east, and max west from borderData
let x_max = -71.51022535353107 // max long
let x_min = -73.42613118833583 // min long
let y_max = 42.730315121762715
let y_min = 45.007561302382754 // ? min lat

// generate a random latitude within the y limits

// let randomLat = y_min + (Math.random() * (y_max - y_min))

// generate a random longitude within the x limits

// let randomLong = x_min + (Math.random() * (x_max - x_min));


// use leaflet-pip to test if the point is within the polygon

function PointChecker() {
        let randomLat = y_min + (Math.random() * (y_max - y_min))
        let randomLong = x_min + (Math.random() * (x_max - x_min));

        let results = LeafletPip.pointInLayer([randomLong, randomLat], L.geoJSON(borderData))
    
        let point = results.length > 0 ? [randomLat, randomLong] : PointChecker()
        return point;
}

// if not, repeat

export default PointChecker;