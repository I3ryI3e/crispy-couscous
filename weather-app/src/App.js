import React, {useState} from 'react';
import config from "./config"

function App() {

  const [query, setQuery] = useState("")
  const [weather, setWeather] = useState({})

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${config.base}weather?q=${query}&units=metric&APPID=${config.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result);
            setQuery("");
            console.log(result)
          });
    }
  }

  const datebuilder = (dat) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[dat.getDay()];
    let date = dat.getDate();
    let month = months[dat.getMonth()];
    let year = dat.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app warm":"app"): "app" }>
        <main>
          <div className="search-box">
            <input type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location"> {weather.name}, {weather.sys.country}</div>
              <div className="date">{datebuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}ºC
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
            ) : ("")}
        </main>
    </div>
  );
}

export default App;
