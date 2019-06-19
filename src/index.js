import _ from 'lodash'
import BubbleChart from './js/bubbleChart'

document.addEventListener("DOMContentLoaded", (e) => {

    let instructions = document.getElementById("instructions")
    let continueButton = document.getElementById("continue")
    continueButton.onclick = () => {
        instructions.classList.add("hide")

        let defaultBubbleChart = new BubbleChart(0.20, 0.25, 0.15, 0.35, 0.05, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 100000, "1 Month")
        defaultBubbleChart.createBubbleChart()
    }

    

    let submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", updateChart)

    let timeFrameButtons = document.getElementsByClassName("timeframe-button")
    
    let eventListeners = []

    for (let i = 0; i < timeFrameButtons.length; i++) {
        eventListeners.push(timeFrameButtons[i].addEventListener("click", () => {
            updateChart(e, timeFrameButtons[i].innerText)
        }))
    }

    function updateChart(e, timeframe="1 Month") {
        e.preventDefault()
        let communicationServices = parseInt(document.getElementById("communication-services").value) / 100
        let consumerDiscretionary = parseInt(document.getElementById("consumer-discretionary").value) / 100
        let consumerStaples = parseInt(document.getElementById("consumer-staples").value) / 100
        let energy = parseInt(document.getElementById("energy").value) / 100
        let financials = parseInt(document.getElementById("finanacials").value) / 100
        let healthCare = parseInt(document.getElementById("health-care").value) / 100
        let industrials = parseInt(document.getElementById("industrials").value) / 100
        let informationTech = parseInt(document.getElementById("information-technology").value) / 100
        let materials = parseInt(document.getElementById("materials").value) / 100
        let realEstate = parseInt(document.getElementById("real-estate").value) / 100
        let utilities = parseInt(document.getElementById("utilities").value) / 100
        let portfolio = parseInt(document.getElementById("portfolio").value)

        d3.select("#chart").selectAll("svg").remove()

        let userBubbleChart = new BubbleChart(communicationServices, consumerDiscretionary, consumerStaples, energy, financials, healthCare, industrials, informationTech, materials, realEstate, utilities, portfolio, timeframe)
        userBubbleChart.createBubbleChart()
    }

    
})

// move chart function to its own file
// set up event listner on index.js page --> setup data and pass into chart function
// chart.js should take in user input --> follow similar structure to performance.js --> setting up a constructor 
// try rendering a default chart --> pass default values into chart.js
// assumption is that when the event has been triggered and info is passed into chart, the information will be overwritten