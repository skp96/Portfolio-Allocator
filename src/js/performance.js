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
        performanceData["Portfolio"] = portfolioDollarAmount
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


        let dataArray = []
        let timeFrame = this.timeFrame
        let newPortValue = performanceData["Portfolio"]
        let data = this.data
        
        let portfolioReturn = (((newPortValue / this.portfolioValue) - 1) * 100).toFixed(2).toString() + "%"
        
        for (let key in performanceData) {
            if (key === "Portfolio") {
                dataArray.push({ ["sector"]: key, ["value"]: performanceData[key], ["timeframe"]: timeFrame, ["portValue"]: newPortValue, ["return"]: portfolioReturn })
            } else {
                dataArray.push({ ["sector"]: key, ["value"]: performanceData[key], ["timeframe"]: timeFrame, ["portValue"]: newPortValue, ["return"]: data[timeFrame][key] })
            }
                
            
        }
        for (let i = 0; i < dataArray.length; i++) {
            if (Object.values(dataArray[i]).includes("Portfolio")) {
                dataArray[i]["fill"] = "#9370DB"
            }else if (Object.values(dataArray[i]).includes("Communication Services")) {
                dataArray[i]["fill"] = "#4f81bd"
            } else if (Object.values(dataArray[i]).includes("Consumer Discretionary")) {
                dataArray[i]["fill"] = "#772c2a"
            } else if (Object.values(dataArray[i]).includes("Consumer Staples")) {
                dataArray[i]["fill"] = "#f79646"
            } else if (Object.values(dataArray[i]).includes("Energy")) {
                dataArray[i]["fill"] = "#4bacc5"
            } else if (Object.values(dataArray[i]).includes("Financials")) {
                dataArray[i]["fill"] = "#4d3b62"
            } else if (Object.values(dataArray[i]).includes("Health Care")) {
                dataArray[i]["fill"] = "#5e7530"
            } else if (Object.values(dataArray[i]).includes("Industrials")) {
                dataArray[i]["fill"] = "#2c4d75"
            } else if (Object.values(dataArray[i]).includes("Information Technology")) {
                dataArray[i]["fill"] = "#27697c"
            } else if (Object.values(dataArray[i]).includes("Materials")) {
                dataArray[i]["fill"] = "#8164a2"
            } else if (Object.values(dataArray[i]).includes("Real Estate")) {
                dataArray[i]["fill"] = "#c0504d"
            } else if (Object.values(dataArray[i]).includes("Utilities")) {
                dataArray[i]["fill"] = "#9cbb59"
            }
        }
        return dataArray
    }
}

export default PerformanceCalculation
