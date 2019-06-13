
function parseData(data) {
    let oldData = Object.assign({}, data)
    delete oldData["Meta Data"]

    let parsedData = {}

    for (let key in oldData) {
        if (key === "Rank A: Real-Time Performance") {
            parsedData["Real-Time"] = oldData[key]
        } else if (key === "Rank B: 1 Day Performance") {
            parsedData["1 Day"] = oldData[key]
        } else if (key === "Rank C: 5 Day Performance") {
           parsedData["5 Day"] = oldData[key]
        } else if (key === "Rank D: 1 Month Performance") {
           parsedData["1 Month"] = oldData[key]
        } else if (key === "Rank E: 3 Month Performance") {
            parsedData["3 Month"] = oldData[key]
        } else if (key === "Rank F: Year-to-Date (YTD) Performance") {
            parsedData["Year-to-Date"] = oldData[key]
        } else if (key === "Rank G: 1 Year Performance") {
            parsedData["1 Year"] = oldData[key]
        } else if (key === "Rank H: 3 Year Performance") {
            parsedData["3 Year"] = oldData[key]
        } else if (key === "Rank I: 5 Year Performance") {
            parsedData["5 Year"] = oldData[key]
        } else if (key === "Rank J: 10 Year Performance") {
            parsedData["10 Year"] = oldData[key]
        }
    }
    return parsedData
}

export default parseData