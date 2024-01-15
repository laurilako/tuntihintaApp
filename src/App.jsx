import { useEffect, useState } from 'react'
import './App.css'
// import { prices } from './util/prices.json' // for testing
import { removeExtraDays } from './util/helperFunctions'
import  VisualWeekChart from './components/VisualWeekChart'
import Today from './components/Today'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  // fetch data from backend proxy server with today as parameter
  // response data is saved to state
  useEffect(() => {
    const today = new Date()
    if(today.getHours() >= 14) {
      today.setDate(today.getDate() + 1)
    }
    axios
      .get('/api/getWeekPrices', { params: { date: today }})
      .then((response) => {
        if(response.data.prices.length < 168) {
          setError({error: 'Dataa ei saatavilla'})
          return
        }
        setData(removeExtraDays(response.data.prices))
      })
      .catch((error) => {
        if(error.response.data) {
          setError(error.response.data)
        } else {
          console.log(error)
        }
      })
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
        <Today data={data}/>
        <div className="chart-header">
          <h3>Pörssisähkön hintakuvaaja viimeiseltä 7 vuorokaudelta<br></br>Mukana tuleva vuorokausi, jos hinnat on julkaistu</h3>
          <h3>Valitse tarkempi ajankohta hiirellä valitsemalla alue ja nollaa valinta napsauttamalla kakkospainiketta</h3>
          <VisualWeekChart data={data} />
        </div>
      </div>
    }
      <p className="note">
        Datan lähde: <a href='https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html'>ENTSO-E transparency platform restful API</a>
      </p>
    </div>
  )
}

export default App
