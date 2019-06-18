import _ from 'lodash'
import PerformanceCalculation from './js/performance'
import parseData from './js/parseData'

document.addEventListener("DOMContentLoaded", (e) => {
    // sectorData().then(data => console.log(new PerformanceCalculation(data, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "1 Month").calculation()))


    const bubbleChart = () => {
        let width = 800,
            height = 750;

        let svg = d3.select('#chart')
            .append('svg')
            .attr("height", height)
            .attr("width", width)
            .append("g")
            .attr("transform", "translate(0,0)")

        let radiusScale = d3.scaleSqrt().domain([0.00, 1.0]).range([0, 150])

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

            let communicationServices = 0.10;
            let consumerDiscretionary = 0.20;
            let consumerStaples = 0.30;
            let energy = 0.05;
            let financials = 0.25;
            let healthCare = 0;
            let industrials = 0;
            let informationTechnology = 0.10;
            let materials = 0;
            let realEstate = 0;
            let utilities = 0;
            let portfolio = 100000;

            let parsedData = parseData(datapoints)
            let peformanceCalc1M = new PerformanceCalculation(parsedData, communicationServices, consumerDiscretionary, consumerStaples, energy, financials, healthCare, industrials, informationTechnology, materials, realEstate, utilities, portfolio, "1 Month")
            let peformanceCalc3M = new PerformanceCalculation(parsedData, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "3 Month")
            let peformanceCalcYTD = new PerformanceCalculation(parsedData, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 0.0909, 100000, "Year-to-Date")
            let performance1M = peformanceCalc1M.calculation()
            let performance3M = peformanceCalc3M.calculation()
            let performanceYTD = peformanceCalcYTD.calculation()


            function getUserInput(e) {
                debugger
                e.preventDefault()
                communicationServices = parseInt(document.getElementById("communication-services").value)/100 
                consumerDiscretionary = parseInt(document.getElementById("consumer-discretionary").value)/100
                consumerStaples = parseInt(document.getElementById("consumer-staples").value)/100
                energy = parseInt(document.getElementById("energy").value)/100
                financials = parseInt(document.getElementById("finanacials").value)/100
                healthCare = parseInt(document.getElementById("health-care").value)/100
                industrials = parseInt(document.getElementById("industrials").value)/100
                informationTechnology = parseInt(document.getElementById("information-technology").value)/100
                materials = parseInt(document.getElementById("materials").value)/100
                realEstate = parseInt(document.getElementById("real-estate").value)/100
                utilities = parseInt(document.getElementById("utilities").value)/100
                portfolio = parseInt(document.getElementById("portfolio").value)

                let userPerformanceCalc1M = new PerformanceCalculation(parsedData, communicationServices, consumerDiscretionary, consumerStaples, energy, financials, healthCare, industrials, informationTechnology, materials, realEstate, utilities, portfolio, "1 Month")
                let userAggPerformance = userPerformanceCalc1M.calculation()
                aggPerformance = userAggPerformance
            }

            let aggPerformance = performance1M
            debugger

            let submitButton = document.getElementById("submit-button");
            submitButton.addEventListener("click", getUserInput)


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
                    debugger
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

// move chart function to its own file
// set up event listner on index.js page --> setup data and pass into chart function
// chart.js should take in user input --> follow similar structure to performance.js --> setting up a constructor 
// try rendering a default chart --> within chart.js have default values
// assumption is that when the event has been triggered and info is passed into chart, the information will be overwritten