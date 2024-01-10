// finds max value and returns its index from data array
export const findMax = (data) => {
    let max = 0
    let maxIndex = 0
    data.forEach((price, index) => {
        if (Number(price.value) > max) {
            max = price.value
            maxIndex = index
        }
    })
    return maxIndex
}
// finds min value and returns its index from data array
export const findMin = (data) => {
    let min = 1000
    let minIndex = 0
    data.forEach((price, index) => {
        if (Number(price.value) < min) {
            min = price.value
            minIndex = index
        }
    })
    return minIndex
}

// format dates to be more readable
export const formatDates = (data) => {
    const formattedData = data.map(price => {
    const date = new Date(price.date)
      return {
            date: date,
            value: price.value
        }
    })
    return formattedData
}