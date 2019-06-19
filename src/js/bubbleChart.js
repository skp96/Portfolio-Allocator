import PerformanceCalculation from './performance'
import parseData from './parseData'


class BubbleChart {
    constructor(communicationServices, consumerDiscretionary, consumerStaples, energy, financials, healthCare, industrials, informationTech, materials, realEstate, utilities, portfolio, timeFrame) {
        this.communicationServices = communicationServices
        this.consumerDiscretionary = consumerDiscretionary
        this.consumerStaples = consumerStaples
        this.energy = energy
        this.financials = financials
        this.healthCare = healthCare
        this.industrials = industrials
        this.informationTech = informationTech
        this.materials = materials
        this.realEstate = realEstate
        this.utilities = utilities
        this.portfolio = portfolio
        this.timeFrame = timeFrame


        this.createBubbleChart = this.createBubbleChart.bind(this)
    }

    createBubbleChart () {
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
            .force("collide", d3.forceCollide(function (d) {
                return radiusScale((d.value / d.portValue)).toFixed(2) * 1.03
            }))

        d3.queue()
            .defer(d3.json, "https://www.alphavantage.co/query?function=SECTOR&apikey=ENGH1ZPF0TF0C7ZH")
            .await(ready)

        let communicationServices = this.communicationServices;
        let consumerDiscretionary = this.consumerDiscretionary;
        let consumerStaples = this.consumerStaples;
        let energy = this.energy;
        let financials = this.financials;
        let healthCare = this.healthCare;
        let industrials = this.industrials;
        let informationTechnology = this.informationTech;
        let materials = this.materials;
        let realEstate = this.realEstate;
        let utilities = this.utilities;
        let portfolio = this.portfolio;
        const timeFrame = this.timeFrame

        function ready(error, datapoints) {

            let parsedData = parseData(datapoints)
            let peformanceCalc = new PerformanceCalculation(parsedData, communicationServices, consumerDiscretionary, consumerStaples, energy, financials, healthCare, industrials, informationTechnology, materials, realEstate, utilities, portfolio, timeFrame)
            let performance = peformanceCalc.calculation()

            let aggPerformance = performance

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
                .attr("r", function (d) {return radiusScale((d.value / d.portValue)).toFixed(2)})
                .attr("fill", function (d) {
                    return d.fill
                })
                .on("mouseover", function (d) {
                    tooltip.text(d.sector + ": " + "$" + format(d.value) + ": " + d.return);
                    tooltip.style("visibility", "visible");
                })
                .on("mousemove", function () {
                    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });

            let texts = svg.selectAll(".texts")
                .data(aggPerformance)
                .enter().append("text")
                .filter(function (d) { return d.value > 0 })
                .text(function (d) { return d.sector.substring(0, radiusScale(d.value / d.portValue).toFixed(2) / 3) })
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
                    .attr("x", function (d) {
                        return d.x
                    })
                    .attr("y", function (d) {
                        return d.y
                    })
            }
        }
    }

}

export default BubbleChart 