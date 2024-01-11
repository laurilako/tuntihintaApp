import { useEffect, useState } from 'react'
import './App.css'
// import { prices } from './util/prices.json'
import VisualWeekChart from './components/VisualWeekChart'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [currDate, setCurrDate] = useState(new Date())
  const [error, setError] = useState(null)

  // fetch data from backend proxy server
  // response data is saved to state
  useEffect(() => {
    axios
      .get('/api')
      .then(response => {
        setData(response.data.prices)
      })
      .catch(error => {
        setError(error.response.data)
      }
    )
  }, [])
  
  // if error occurs, show error message
  if(error) {
    return (
      <div className="container">
        <h2>Virhe!</h2>
        <p>{error.error}</p>
        <p>Yritä myöhemmin uudestaan.</p>
      </div>
    )
  }

  return (
    <div className="container">
    {
      !data ?
        <div className="loading">
          <h2>Haetaan tietoja!</h2>
          <div className='loader'/>
        </div>
      :
      <div>
        <div className="timeInfo">
          <h2></h2>
          <p>
          {currDate.getDate()}.{currDate.getMonth() + 1}.{currDate.getFullYear() + ' ' + currDate.getHours() + ':' + 
          (currDate.getMinutes() < 10 ? '0' + currDate.getMinutes() : currDate.getMinutes())}
          </p>
        </div>
        <div className="weekchart">
          <h3>Hintakuvaaja viimeiseltä 7 vuorokaudelta ja tulevalta vuorokaudelta, jos hinnat on julkaistu</h3>
          <h3>Valitse tarkempi ajankohta hiirellä maalaamalla alue ja nollaa valinta napsauttamalla kakkospainiketta </h3>
          <VisualWeekChart data={data} />
        </div>
      </div>
    }
      <p className="note">
        Data from <a href='https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html'>ENTSO-E transparency platform restful API</a>
      </p>
    </div>
  )
}

export default App
