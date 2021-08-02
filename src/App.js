import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
//import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MyMap from './components/MyMap'
import { DateTime } from 'luxon'

function App() {
  const [ipData, setIpData] = useState([])
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState([])

  const KEY = process.env.REACT_APP_KEY



  const fetchData = async () => {
    await axios.get(`https://geo.ipify.org/api/v1?apiKey=${KEY
      }`)
      .then(response => {
        console.log(response)
        setIpData(response.data)
        return response.data
      })
      .then(ipData =>
        axios.get(`https://restcountries.eu/rest/v2/alpha/${ipData.location.country}`))
      .then(response => {
        setInfo(response.data)
        setLoading(false)
      })

      .catch(error => console.log(error))
  }

  //the faster, but not that neat approach is to have a fetchCountry in one of the components, cause they only load after fetchData was executed because of 'loading'

  useEffect(() => {
    fetchData()
  }, [])

  const setOffset = () => {
    let hour = ipData.location.timezone[2]
    let op = ipData.location.timezone[0]
    let ipDate
    if (op !== '+') {
      ipDate = DateTime.utc().minus({ hours: hour })
    } else { ipDate = DateTime.utc().plus({ hours: hour }) }
    return ipDate
  }

  console.log(info)



  return (
    <div className="block">
      {loading ? <h1>Loading</h1> :
        <>
          <h1>IP address: {ipData.ip}</h1>
          <h4>IP geolocation in: {ipData.location.city}, {ipData.location.country}</h4>
          <h4>Provider: {ipData.isp}</h4>
          <h4>IP's local timezone: {info.timezones[0]}</h4>
          <h4>IP's local day and time: {setOffset().toLocaleString(DateTime.DATETIME_FULL)}</h4>
          <h4>System's local day and time: {DateTime.now().toLocaleString(DateTime.DATETIME_FULL)}</h4>
          <MyMap ipData={ipData} info={info} />
        </>}
    </div >
  );
}

export default App;
