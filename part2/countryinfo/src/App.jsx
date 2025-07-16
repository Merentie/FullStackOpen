import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Display = ({info, countries, setcountries, weather}) => {
  console.log(weather)
  if (countries.length == 1) {
    return (
      <div>
        <h1> {info.name} </h1>
        <p> Capital: {info.capital} </p>
        <p> Area: {JSON.stringify(info.area, null, 2)} km<sup>2</sup> </p>
        <h2> Languages: </h2>
        <ul>
        {Object.values(info.languages).map((language, i) => 
          <li key={i}> {language} </li>
        )}
        </ul>
        <img src={info.flag} width="200" />
        <h2> Weather in {info.capital} </h2>
        <p> Temperature: {weather.temp.toPrecision(3)} Celsius </p>
        <img src={weather.icon} />
        <p> Wind: {weather.wind} m/s </p>

      </div>
    )
  }
  if (countries.length > 10) {
    return (
      <p> Too many matches, specify another filter </p>
    )
  }
  if (countries.length > 1) {
    return (
    <div>
      {countries.map((selection, i) => 
        <p key={i}> {selection} <button onClick={() => setcountries([selection])}> show </button> </p>
      )}
    </div>
    )
  }
  return null
}

const App = () => {
  const [value, setValue] = useState('')
  const [info, setInfo] = useState({languages: []})
  const [weather, setWeather] = useState({
    temp: 0,
    icon: null,
    wind: 0
  })
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if (countries.length == 1) {
      setCountry(countries[0])
    }
    else {
      setCountry(null)
    }
  }, [countries])

  useEffect(() => {
    if (country) {
      countryService
        .getCountry(country)
        .then(response => {
          setInfo(
            {
              name: response.data.name.common,
              capital: response.data.capital[0],
              area: response.data.area,
              languages: response.data.languages,
              flag: response.data.flags.png
            })
          countryService
            .getWeather(response.data.capital[0], api_key)
            .then(response => {
              setWeather(
                {
                  temp: response.data.main.temp-273.15,
                  icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                  wind: response.data.wind.speed
                }
              )
            })
        })
    }
  }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data
          .filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
          .map(filtered => filtered.name.common))
      })
  }

  return (
    <div>
      country: <input value={value} onChange={handleChange} />
      <Display info={info} countries={countries} setcountries={setCountries} weather={weather}/>
    </div>
  )
}

export default App