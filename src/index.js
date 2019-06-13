import _ from 'lodash'
import sectorData from './js/data'
import PerformanceCalculation from './js/performance'
import parseData from './js/parseData'

document.addEventListener("DOMContentLoaded", (e) => {
    // sectorData().then(data => console.log(new PerformanceCalculation(data, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "1 Month").calculation()))


    const bubbleChart = ()  => {
        var width= 500,
        height = 500;

        var svg = d3.select('#chart')
            .append('svg')
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("transform", "translate(0,0)")

        // var radiusScale = d3.scaleSqrt().domain([80000, 100500]).range([10,80])
        
        var simulation = d3.forceSimulation()
            .force("x", d3.forceX(width / 2).strength(0.010))
            // .force("y", d3.forceY(height / 2).strength(0.05))
            // .force("collide", d3.forceCollide(10))

        d3.queue()
            .defer(d3.json, "https://www.alphavantage.co/query?function=SECTOR&apikey=ENGH1ZPF0TF0C7ZH")
            .await(ready)

        function ready (error, datapoints) {
            let parsedData = parseData(datapoints)
            let peformanceCalc = new PerformanceCalculation(parsedData, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "1 Month")
            let performance = peformanceCalc.calculation()
            
            var circles = svg.selectAll(".sector")
                .data(performance)
                .enter().append("circle")
                .attr("class", "sector")
                .attr("r", 10)
                .attr("fill", function(d) {
                    return d.fill
                })
            
            simulation.nodes(performance)
                .on('tick', ticked())

            function ticked() {
                circles
                    .attr("cx", function(d) {
                        return d.x
                    })
                    .attr("cy", function(d) {
                        return d.y
                    })

            }       
        }
    }

    bubbleChart()
    
})

// pass data to an instance of the calculation class --> dom gets loaded fetches the data 
// and passes the data to the instance of the calculation
// after data --> create function passing in data so data => function(data) {}
// within the function create a new performance calculation, grab input data, and pass it to the instance invoked
// let calc = new PerformanceCalculations(data,inputs)
// let data = calc.calculations()
// pass data to chart