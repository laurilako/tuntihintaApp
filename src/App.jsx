import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { prices } from './util/prices.json'
import VisualChart from './components/VisualChart'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currDate, setCurrDate] = useState(null)
  const bUrl = ''
  
  // set hard coded data to state for testing purposes from util/prices.json

  // get current time
  useEffect(() => {
    setLoading(true)
    const date = new Date()
    setCurrDate(date)
    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])


  useEffect(() => {
    setData(prices)
    setLoading(false)
  }, [])

  // fetch data from API, with date range set from current date to 7 days back
  // response data is saved to state

  // useEffect(() => {
  //   setLoading(true)
  //   axios.get(bUrl)
  //     .then(response => {
  //       setData(response.data)
  //       setLoading(false)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }, [])

  console.log(loading)
  console.log(currDate)
  console.log(data)

  return (
    <>{
      loading ?
        <div className="loading">
          <h2>Loading...</h2>
        </div>
        :
      <div>
        <h1>Tuntihinta</h1>
        <div className="timeInfo">
          <h2>👋</h2>
          <p>
           {currDate.getDate()}.{currDate.getMonth() + 1}.{currDate.getFullYear()}
          </p>
        </div>
        <div className="chart">
          <h2>Hintakuvaaja viimeiseltä 7 päivältä</h2>
          <VisualChart data={data} />
        </div>
        <p className="note">
          Data from https://sahkotin.fi/
        </p>
      </div>
    }
    </>
  )
}

export default App
