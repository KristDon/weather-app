import axios from "axios";
import { AstroWeatherResponse } from "./models/AstroWeatherResponse";
import { ForecastWeatherResponse } from "./models/ForecastWeatherResponse";
import { getIpData } from "./getIpService";
import { AutoCompleteAPIResponse } from "./models/AutoCompleteApiResponse";

const baseUrl = "https://weatherapi-com.p.rapidapi.com";
const headers = {
  "X-RapidAPI-Key": "5c327397famsh49434436f87ee75p171d38jsn8e6b02d8af03",
  "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
};

export const getCurrentWeather = async (query: string) => {
  try {
    const response = await axios.get<CurrentWeatherResponse>(
      `${baseUrl}/current.json`,
      {
        headers: headers,
        params: { q: query },
      }
    );

    const result: Weather = {
      city: response.data.location.name,
      conditionText: response.data.current.condition.text,
      condition: response.data.current.condition.code,
      tempreture: response.data.current.temp_c,
      country: response.data.location.country,
      region: response.data.location.region,
      date: new Date(response.data.location.localtime),
      pressure: response.data.current.pressure_mb,
      rainChance: response.data.current.precip_mm,
      windSpeed: response.data.current.wind_kph,
      uvIndex: response.data.current.uv,
    };

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentAstroWeather = async (query: string) => {
  try {
    const response = await axios.get<AstroWeatherResponse>(
      `${baseUrl}/astronomy.json`,
      {
        headers: headers,
        params: { q: query },
      }
    );

    const resultAstro: AstroWeather = {
      sunrise: response.data.astronomy.astro.sunrise,
      sunset: response.data.astronomy.astro.sunset,
      timezone: response.data.location.tz_id,
    };

    return resultAstro;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentForecastWeather = async (query: string, days = 7) => {
  try {
    const responseForecast = await axios.get<ForecastWeatherResponse>(
      `${baseUrl}/forecast.json`,
      {
        headers: headers,
        params: { q: query, days },
      }
    );

    return responseForecast.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAutoCompleteApiResponse = async (query: string) => {
  try {
    const response = await axios.get<AutoCompleteAPIResponse[]>(
      `${baseUrl}/search.json`,
      {
        headers: headers,
        params: { q: query },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
