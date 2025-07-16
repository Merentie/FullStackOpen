import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return axios.get(`${baseUrl}/all`)
}

const getCountry = (country) => {
  return axios.get(`${baseUrl}/name/${country}`)
}

const getWeather = (city_name, api_key) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`)
}

export default { 
  getAll: getAll, 
  getCountry: getCountry,
  getWeather: getWeather
}
