import _ from 'lodash'
import sectorData from './js/data'
import PerformanceCalculation from './js/performance'

document.addEventListener("DOMContentLoaded", (e) => {
    sectorData().then(data => console.log(new PerformanceCalculation(data, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "1 Month").calculation()))
})

// pass data to an instance of the calculation class --> dom gets loaded fetches the data 
// and passes the data to the instance of the calculation
// after data --> create function passing in data so data => function(data) {}
// within the function create a new performance calculation, grab input data, and pass it to the instance invoked
// let calc = new PerformanceCalculations(data,inputs)
// let data = calc.calculations()
// pass data to chart