import parseData from './parseData'

const sectorData = () => {

    return fetch("https://www.alphavantage.co/query?function=SECTOR&apikey=ENGH1ZPF0TF0C7ZH")
    .then(response => response.json())
    .then(data => parseData(data))
}

export default sectorData