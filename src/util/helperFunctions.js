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

// tries to find current price and returns it
export const findCurrentPrice = (data, currentTime) => {
    currentTime.setMinutes(0,0,0,0)
    currentTime.setSeconds(0,0)
    try {
        const currTime = currentTime.toISOString()
        const currTimePrice = data.find(price => price.date === currTime)
        return currTimePrice.value
    } catch (error) {
        return null
    }
}