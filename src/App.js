import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const api = {

  key: "2419c8614462b50f90003a6f9df49ca8", 
  base: "https://api.openweathermap.org/data/2.5/",

};

function App() {

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("")
  
  const searchPressed = async () =>{
    if (!search){
      setError("Please enter a city name.")
      return;
    }
    setError('')
 
    try{
      const response = await fetch(
        `${api.base}weather?q=${search}&appid=${api.key}&units=imperial`
      );
      const data = await response.json();

      if (data.cod === 404){
        setError("City not Found");
        setWeather(null);
        }

      else{
        setWeather(data);
        setError('')
        }
      }

      catch (err){
        setError("Failed to fetch data")
        setWeather(null)
      }

  } 

  

  return (
    <div className="App">
      <header className="App-header">
        
        <h1> Weather </h1>

        {/* Input and Search Button */}
        <div>
          <input 
            type = "text" 
            placeholder='Enter city/town....'
            onChange = {(e) => setSearch(e.target.value)} 
            />
          <button onClick={searchPressed}> Search </button>
        </div>
        
        {error && <div className="error">{error}</div>}


        {weather && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>Temperature: {weather.main.temp}°F</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
        )}


      </header>
    </div>
  );
}

export default App;
