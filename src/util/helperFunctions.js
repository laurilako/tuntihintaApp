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

// tries to find current index from data array and returns it
export const findCurrentPrice = (data, currentTime) => {
    currentTime.setMinutes(0,0,0,0)
    currentTime.setSeconds(0,0)
    try {
        const currTime = currentTime.toISOString()
        // find index of current time from data array
        const currTimeIndex = data.findIndex(price => price.date === currTime)
        return currTimeIndex
    } catch (error) {
        return null
    }
}

export const calculateAverage = (data) => {
    let sum = 0
    data.forEach(price => {
        sum += Number(price.value)
    })
    return sum / data.length
}