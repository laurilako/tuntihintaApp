import { useEffect, useState } from 'react'
import './App.css'
import { prices } from './util/prices.json'
import VisualChart from './components/VisualChart'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [currDate, setCurrDate] = useState(new Date())
  const [dateWeekAgo, setDateWeekAgo] = useState(null)
  
  const bUrl = 'http://localhost:4000/getWeekPrices'
  
  // set hard coded data to state for testing purposes from util/prices.json
  // useEffect(() => {
  //   setData(prices)
  //   setLoading(false)
  // }, [])

  useEffect(() => {
    CalculateWeekAgo()
  }, [])

  // fetch data from backend
  // response data is saved to state
  // parameters for API call:
  // - start: current date
  // - end: 7 days back from current date
  useEffect(() => {
    axios
      .get(bUrl)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error)
      }
    )
  }, [])
  
  // calculate date 7 days back from current date
  const CalculateWeekAgo = () => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    weekAgo.setHours(0, 0, 0, 0)
    setDateWeekAgo(weekAgo)
  }

  // debugginnn
  console.log("Tänää:", currDate)
  console.log("7 päivää sitten:", dateWeekAgo)
  console.log("Data:", data)

  return (
    <>{
      !data ?
        <div className="loading">
          <h2>Loading...</h2>
        </div>
        :
      <div>
        <h1>TUNTIHINTA</h1>
        <div className="timeInfo">
          <h2>👋</h2>
          <p>
           {currDate.getDate()}.{currDate.getMonth() + 1}.{currDate.getFullYear()}
          </p>
        </div>
        <div className="chart">
          <h2>Hintakuvaaja viimeiseltä 7 päivältä</h2>
          {/* <VisualChart data={data} /> */}
        </div>
        <p className="note">
          Data from ENTSO-E transparency platform restful API
        </p>
      </div>
    }
    </>
  )
}

export default App
