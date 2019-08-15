import _ from 'lodash'
import BubbleChart from './js/bubbleChart'

document.addEventListener("DOMContentLoaded", (e) => {

    let portfolioValue = document.getElementById("portfolio")
    portfolioValue.addEventListener("keyup", function() {
        let error = document.querySelector(".error")
        if (error.style.visibility === "visible") {
            error.style.visibility = "hidden";
        }
        let value = this.value
        let commaseperated = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        this.value = commaseperated
    })
    let instructions = document.getElementById("instructions")
    let continueButton = document.getElementById("continue")
    let submitButton = document.getElementById("submit-button");
    let timeFrameButtons = document.getElementsByClassName("timeframe-button");
    let counter = document.querySelector(".counter")
    let inputs = document.querySelectorAll(".slider")

    inputs.forEach((input) => {
        input.addEventListener("input", updateCounter);
    })
    
    continueButton.onclick = () => {
        instructions.classList.add("hide")
        submitButton.style.visibility = "visible"
        for (let i = 0; i < timeFrameButtons.length; i++) {
            let timeFrame = timeFrameButtons[i];
            timeFrame.style.visibility = "visible";
        }
        counter.style.visibility = "visible"

        let defaultBubbleChart = new BubbleChart(0.20, 0.25, 0.15, 0.35, 0.05, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 100000, "1 Month")
        defaultBubbleChart.createBubbleChart()
    }

    
    submitButton.addEventListener("click", updateChart)

    let eventListeners = []

    for (let i = 0; i < timeFrameButtons.length; i++) {
        eventListeners.push(timeFrameButtons[i].addEventListener("click", () => {
            updateChart(e, timeFrameButtons[i].innerText)
        }))
    }

    function updateChart(e, timeframe="1 Month") {
        e.preventDefault()
        let count = parseInt(document.querySelector("#count").innerHTML.split("%")[0])
        let portfolioValue = document.querySelector("#portfolio")
        let error = document.querySelector(".error")
        debugger
        if (count === 100) {

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
            let portfolio = parseInt(document.getElementById("portfolio").value.replace(/,/g, ""));

            d3.select("#chart").selectAll("svg").remove()

            let userBubbleChart = new BubbleChart(communicationServices, consumerDiscretionary, consumerStaples, energy, financials, healthCare, industrials, informationTech, materials, realEstate, utilities, portfolio, timeframe)
            userBubbleChart.createBubbleChart()
            
        } else if (portfolioValue.value === "") {
            error.innerHTML = "Please enter a portfolio value"
            error.style.visibility = "visible";
        } else {
            error.innerHTML = "Please readjust sector weights to equal a total of 100%"
            error.style.visibility = "visible";
        }
    }

    function updateCounter() {
        let count = 0
        let inputs = document.querySelectorAll(".slider")
        let error = document.querySelector(".error")
        let counter = document.querySelector("#count")
        if (error.style.visibility === "visible") {
            error.style.visibility = "hidden";
        }
        
        inputs.forEach((input) => {
            count += parseInt(input.value)
        })

        counter.innerHTML = `${count.toString()}%`
        return;
    }
})