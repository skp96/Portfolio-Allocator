// set up performance class
// an instance of the performance class should have the following 
// attributes: (1) the data, (2) user's input for Communication Services,
// (3) user's input for Consumer Discretionary, (4) user's input for Consumer Staples,
// (5) user's input for Energy, (6) user's input for Financials, (7) user's input for Health Care,
// (8) user's input for Industrials, (9) user's input for Information Technology,
// (10) user's input for Materials, (11) user's input for Real Estate, (12) user's input for Utilities
// (11) portfolio value, (12) user's timeframe

class PerformanceCalculation {
    constructor(data, communicationServices, consumerDiscretionary, consumerStaples, energy, financials, healthCare, industrials, informationTech, materials, realEstate, utilities, portfolioValue, timeFrame) {
        this.data = data;
        this.communicationServicesWeights = communicationServices;
        this.consumerDiscretionaryWeights = consumerDiscretionary;
        this.consumerStaplesWeights = consumerStaples;
        this.energyWeights = energy;
        this.financialsWeights = financials;
        this.healthCareWeights = healthCare;
        this.industrialsWeights = industrials;
        this.informationTechWeights = informationTech;
        this.materialsWeights = materials;
        this.realEstateWeights = realEstate
        this.utilitiesWeights = utilities
        this.portfolioValue = portfolioValue
        this.timeFrame = timeFrame
        this.calculation = this.calculation.bind(this)
    }

    calculation() {
        let performanceData = {}
        let portfolioDollarAmount = ((
            ((parseFloat(this.data[this.timeFrame]["Communication Services"])/100) * this.communicationServicesWeights) +
            ((parseFloat(this.data[this.timeFrame]["Consumer Discretionary"])/100) * this.consumerDiscretionaryWeights) +
            ((parseFloat(this.data[this.timeFrame]["Consumer Staples"])/100) * this.consumerStaplesWeights) +
            ((parseFloat(this.data[this.timeFrame]["Energy"])/100) * this.energyWeights) +
            ((parseFloat(this.data[this.timeFrame]["Financials"])/100) * this.financialsWeights) + 
            ((parseFloat(this.data[this.timeFrame]["Health Care"])/100) * this.healthCareWeights) +
            ((parseFloat(this.data[this.timeFrame]["Industrials"])/100)* this.industrialsWeights) +
            ((parseFloat(this.data[this.timeFrame]["Information Technology"])/100) * this.informationTechWeights) +
            ((parseFloat(this.data[this.timeFrame]["Materials"])/100) * this.materialsWeights) +
            ((parseFloat(this.data[this.timeFrame]["Real Estate"])/100) * this.realEstateWeights) +
            ((parseFloat(this.data[this.timeFrame]["Utilities"])/100) * this.utilitiesWeights)
        ) + 1 ) * this.portfolioValue

        performanceData["portfolioDollarAmount"] = portfolioDollarAmount
        performanceData["communicationServices"] = ((parseFloat(this.data[this.timeFrame]["Communication Services"]) / 100) + 1) * (this.portfolioValue * this.communicationServicesWeights)
        performanceData["consumerDiscretionary"] = ((parseFloat(this.data[this.timeFrame]["Consumer Discretionary"]) / 100) + 1) * (this.portfolioValue * this.consumerDiscretionaryWeights)
        performanceData["consumerStaples"] = ((parseFloat(this.data[this.timeFrame]["Consumer Staples"]) / 100) + 1) * (this.portfolioValue * this.consumerStaplesWeights)
        performanceData["energy"] = ((parseFloat(this.data[this.timeFrame]["Energy"]) / 100) + 1) * (this.portfolioValue * this.energyWeights)
        performanceData["financials"] = ((parseFloat(this.data[this.timeFrame]["Financials"]) / 100) + 1) * (this.portfolioValue * this.financialsWeights)
        performanceData["healthCare"] = ((parseFloat(this.data[this.timeFrame]["Health Care"]) / 100) + 1) * (this.portfolioValue * this.healthCareWeights)
        performanceData["industrials"] = ((parseFloat(this.data[this.timeFrame]["Industrials"]) / 100) + 1) * (this.portfolioValue * this.industrialsWeights)
        performanceData["informationTechnology"] = ((parseFloat(this.data[this.timeFrame]["Information Technology"]) / 100) + 1) * (this.portfolioValue * this.informationTechWeights)
        performanceData["materials"] = ((parseFloat(this.data[this.timeFrame]["Materials"]) / 100) + 1) * (this.portfolioValue * this.materialsWeights)
        performanceData["realEstate"] = ((parseFloat(this.data[this.timeFrame]["Real Estate"]) / 100) + 1) * (this.portfolioValue * this.realEstateWeights)
        performanceData["utilities"] = ((parseFloat(this.data[this.timeFrame]["Utilities"]) / 100) + 1) * (this.portfolioValue * this.utilitiesWeights)


        let dataArray = []
        for (let key in performanceData) {
            dataArray.push({ [key]: performanceData[key] })
        }
        for (let i = 0; i < dataArray.length; i++) {
            if (Object.keys(dataArray[i]).includes("portfolioDollarAmount")) {
                dataArray[i]["fill"] = "lightgrey"
            } else if (Object.keys(dataArray[i]).includes("communicationServices")) {
                dataArray[i]["fill"] = "lightred"
            } else if (Object.keys(dataArray[i]).includes("consumerDiscretionary")) {
                dataArray[i]["fill"] = "lightblue"
            } else if (Object.keys(dataArray[i]).includes("consumerStaples")) {
                dataArray[i]["fill"] = "lightorange"
            } else if (Object.keys(dataArray[i]).includes("energy")) {
                dataArray[i]["fill"] = "lightyellow"
            } else if (Object.keys(dataArray[i]).includes("financials")) {
                dataArray[i]["fill"] = "lightgreen"
            } else if (Object.keys(dataArray[i]).includes("healthCare")) {
                dataArray[i]["fill"] = "lightpurple"
            } else if (Object.keys(dataArray[i]).includes("industrials")) {
                dataArray[i]["fill"] = "green"
            } else if (Object.keys(dataArray[i]).includes("informationTechnology")) {
                dataArray[i]["fill"] = "blue"
            } else if (Object.keys(dataArray[i]).includes("materials")) {
                dataArray[i]["fill"] = "red"
            } else if (Object.keys(dataArray[i]).includes("realEstate")) {
                dataArray[i]["fill"] = " black"
            } else if (Object.keys(dataArray[i]).includes("utilities")) {
                dataArray[i]["fill"] = "orange"
            }
        }
        return dataArray
    }
}

export default PerformanceCalculation
