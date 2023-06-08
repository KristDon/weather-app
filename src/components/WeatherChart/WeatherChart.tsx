import {
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";


ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,

);

import React from "react";
import { Forecast, ForecastWeatherResponse, Hour } from "../../services/models/ForecastWeatherResponse";
import { string } from "prop-types";

interface weatherChartProps {
    weatherForecast: ForecastWeatherResponse
}

export const WeatherChart = ({ weatherForecast }: weatherChartProps) => {


    const labels:string[] = [];
    const averTempValues:number[] = [];

    const getWeekDays = () => {
        for (let i = 0; i < weatherForecast.forecast.forecastday.length; i++) {
            const date = new Date(weatherForecast.forecast.forecastday[i].date);
            labels.push(date.toLocaleDateString('en-US', {weekday: 'long'}));

            const averTemp = weatherForecast.forecast.forecastday[i].day.avgtemp_c;
            averTempValues.push(averTemp);

        }
    }
    getWeekDays();

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Average tempreture',
                data: averTempValues,
                fill: true,
                backgroundColor: "#385e9f",
                borderColor: "#385e9f"
                
            },
        ]
    }


    return (
        <>
            <div className="chart-container">
                <Line data={data} />
            </div>
        </>
    );
}