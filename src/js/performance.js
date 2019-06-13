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
        debugger
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
        performanceData["Communication Services"] = ((parseFloat(this.data[this.timeFrame]["Communication Services"]) / 100) + 1) * (this.portfolioValue * this.communicationServicesWeights)
        performanceData["Consumer Discretionary"] = ((parseFloat(this.data[this.timeFrame]["Consumer Discretionary"]) / 100) + 1) * (this.portfolioValue * this.consumerDiscretionaryWeights)
        performanceData["Consumer Staples"] = ((parseFloat(this.data[this.timeFrame]["Consumer Staples"]) / 100) + 1) * (this.portfolioValue * this.consumerStaplesWeights)
        performanceData["Energy"] = ((parseFloat(this.data[this.timeFrame]["Energy"]) / 100) + 1) * (this.portfolioValue * this.energyWeights)
        performanceData["Financials"] = ((parseFloat(this.data[this.timeFrame]["Financials"]) / 100) + 1) * (this.portfolioValue * this.financialsWeights)
        performanceData["Health Care"] = ((parseFloat(this.data[this.timeFrame]["Health Care"]) / 100) + 1) * (this.portfolioValue * this.healthCareWeights)
        performanceData["Industrials"] = ((parseFloat(this.data[this.timeFrame]["Industrials"]) / 100) + 1) * (this.portfolioValue * this.industrialsWeights)
        performanceData["Information Technology"] = ((parseFloat(this.data[this.timeFrame]["Information Technology"]) / 100) + 1) * (this.portfolioValue * this.informationTechWeights)
        performanceData["Materials"] = ((parseFloat(this.data[this.timeFrame]["Materials"]) / 100) + 1) * (this.portfolioValue * this.materialsWeights)
        performanceData["Real Estate"] = ((parseFloat(this.data[this.timeFrame]["Real Estate"]) / 100) + 1) * (this.portfolioValue * this.realEstateWeights)
        performanceData["Utilities"] = ((parseFloat(this.data[this.timeFrame]["Utilities"]) / 100) + 1) * (this.portfolioValue * this.utilitiesWeights)

        return performanceData
    }
}

export default PerformanceCalculation
