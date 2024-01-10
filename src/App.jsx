import { useEffect, useState } from 'react'
import './App.css'
import { prices } from './util/prices.json'
import VisualWeekChart from './components/VisualWeekChart'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [currDate, setCurrDate] = useState(new Date())
  
  const bUrl = 'http://localhost:4000/getWeekPrices'
  

  // fetch data from backend
  // response data is saved to state
  useEffect(() => {
    axios
      .get(bUrl)
      .then(response => {
        setData(response.data.prices)
      })
      .catch(error => {
        console.log(error)
      }
    )
  }, [])
  

  return (
    <>{
      !data ?
        <div className="loading">
          <h2>Loading...</h2>
        </div>
        :
      <div>
        {/* <h1 className='header'>TUNTIHINTA</h1> */}
        <div className="timeInfo">
          <h2></h2>
          <p>
          {currDate.getDate()}.{currDate.getMonth() + 1}.{currDate.getFullYear()}
          </p>
        </div>
        {/* <div className="todaychart">
          <h2>Hintakuvaaja viimeiseltä 7 päivältä</h2>
          <VisualWeekChart data={data} />
        </div> */}
        <div className="weekchart">
          <h2>Hintakuvaaja viimeiseltä 7 päivältä</h2>
          <h3>Valitse tarkempi ajankohta hiirellä valitsemalla alue ja nollaa valinta napsauttamalla kakkospainiketta </h3>
          <VisualWeekChart data={data} />
        </div>
      </div>
    }
      <p className="note">
        Data from ENTSO-E transparency platform restful API
      </p>
    </>
  )
}

export default App
