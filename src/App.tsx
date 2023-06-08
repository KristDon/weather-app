import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header/Header'
import { Overview } from './components/Overview/Overview'
import { getCurrentAstroWeather, getCurrentForecastWeather, getCurrentWeather } from './services/weatherService'
import { LocationDetails } from './components/LocationDetails/LocationDetails'
import { SunriseSunset } from './components/SunriseSunset/SunriseSunset'
import { ForecastWeatherResponse } from './services/models/ForecastWeatherResponse'
import { HourlyForecast } from './components/HourlyForecast/HourlyForecast'
import { getIpData } from './services/getIpService'
import { WeatherChart } from './components/WeatherChart/WeatherChart'


function App() {

  const [weather, setWeather] = useState<Weather>();
  const [astroWeather, setAstroWeather] = useState<AstroWeather>();
  const [forecastWeather, setForecastWeather] = useState<ForecastWeatherResponse>();
  const [chartData, setChartData] = useState({
    // ...chart data
  });

  const loadWeatherData = async (querry: string) => {

    const weatherResult = await getCurrentWeather(querry);
    setWeather(weatherResult);

    const astroWeatherResponse = await getCurrentAstroWeather(querry);
    setAstroWeather(astroWeatherResponse);

    const forecastWeatherResponse = await getCurrentForecastWeather(querry);
    setForecastWeather(forecastWeatherResponse);
  }



  useEffect(() => {

    const init = async () => {

      const ip = await getIpData();

      await loadWeatherData(ip.ip);

    }

    init();



  }, []);

  const handleLocationChange = (locationName: string) => {
    loadWeatherData(locationName);
  }

  return (
    <>
      <div className='container'>
        <div className='leftContainer'>
          {weather != null && forecastWeather != null && (
            <>
              <Header localtime={weather.date} onLocationChange={handleLocationChange} />

              <Overview windSpeed={weather.windSpeed} rainChance={weather.rainChance}
                pressure={weather.pressure} uvIndex={weather.uvIndex} />

              <WeatherChart weatherForecast={forecastWeather} />
            </>
          )}
        </div>
        {weather != null && astroWeather != null && forecastWeather != null && (
          <div className='rightContainer'>
            <LocationDetails city={weather.city} time={weather.date} country={weather.country} condition={weather.condition}
              timezone={astroWeather.timezone} region={weather.region} tempreture={weather.tempreture} conditionText={weather.conditionText} />

            <HourlyForecast time={weather.date} hours={[...forecastWeather.forecast.forecastday[0].hour,
            ...forecastWeather.forecast.forecastday[1].hour]} />

            <SunriseSunset sunrise={astroWeather.sunrise} sunset={astroWeather.sunset} time={weather.date} />
          </div>
        )}
      </div>
    </>
  )
}

export default App


