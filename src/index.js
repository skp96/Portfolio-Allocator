import _ from 'lodash'
import sectorData from './js/data'
import PerformanceCalculation from './js/performance'
import parseData from './js/parseData'

document.addEventListener("DOMContentLoaded", (e) => {
    // sectorData().then(data => console.log(new PerformanceCalculation(data, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "1 Month").calculation()))


    const bubbleChart = () => {
        var width = 800,
            height = 750;

        var svg = d3.select('#chart')
            .append('svg')
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("transform", "translate(0,0)")

        var radiusScale = d3.scaleSqrt().domain([0.00, 1.0]).range([0, 150])

        let simulation = d3.forceSimulation()
            .force("x", d3.forceX(width / 1.8).strength(0.10))
            .force("y", d3.forceY(height / 2).strength(0.10))
            .force("collide",d3.forceCollide(function(d) {
                return radiusScale((d.value / d.portValue)).toFixed(2) * 1.03
            }))

        d3.queue()
            .defer(d3.json, "https://www.alphavantage.co/query?function=SECTOR&apikey=ENGH1ZPF0TF0C7ZH")
            .await(ready)

        function ready(error, datapoints) {
            let parsedData = parseData(datapoints)
            let peformanceCalc1M = new PerformanceCalculation(parsedData, 0.10, 0.15, 0.15, 0.40, 0.18, 0.12, 0.30, 0.0, 0.0, 0.0, 0.0, 100000, "1 Month")
            let peformanceCalc3M = new PerformanceCalculation(parsedData, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "3 Month")
            let peformanceCalcYTD = new PerformanceCalculation(parsedData, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "Year-to-Date")
            let performance1M = peformanceCalc1M.calculation()
            let performance3M = peformanceCalc3M.calculation()
            let performanceYTD = peformanceCalcYTD.calculation()

            let aggPerformance = performance1M

            let format = d3.format(",d")

            let tooltip = d3.select('#chart')
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .style("color", "white")
                .style("padding", "8px")
                .style("background-color", "rgba(0, 0, 0, 0.75)")
                .style("border-radius", "6px")
                .style("font", "12px sans-serif")
                .text("tooltip");

            let circles = svg.selectAll(".sector")
                .data(aggPerformance)
                .enter().append("circle")
                .attr("class", "sector")
                .attr("r", function(d) {
                    return radiusScale((d.value/d.portValue)).toFixed(2)})
                .attr("fill", function (d) {
                    return d.fill
                })
                .on("mouseover", function (d) {
                    tooltip.text(d.sector + ": " + "$"+ format(d.value) + ": " + d.return);
                    tooltip.style("visibility", "visible");
                })
                .on("mousemove", function () {
                    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });

            let texts = svg.selectAll(".texts")
                .data(aggPerformance)
                .enter().append("text")
                .filter(function(d) {return d.value > 0})
                .text(function(d) {return d.sector.substring(0, radiusScale(d.value / d.portValue).toFixed(2) / 3 )})
                .attr("fill", "white")
                .attr("font-family", 'Open Sans Condensed')
                .attr("dy", ".3em")
                .style("text-anchor", "middle")


            simulation.nodes(aggPerformance)
                .on('tick', ticked)

            function ticked() {
                circles
                    .attr("cx", function (d) {
                        return d.x
                    })
                    .attr("cy", function (d) {
                        return d.y
                    })

                texts   
                    .attr("x", function(d) {
                        return d.x
                    })
                    .attr("y", function(d) {
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