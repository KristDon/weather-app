import { useEffect, useMemo, useState } from 'react';
import styles from './HourlyForecast.module.css';
import { Hour } from '../../services/models/ForecastWeatherResponse';
import { WiCloud, WiCloudy, WiDayCloudy, WiDayRainMix, WiDaySunny, WiRain, WiRainMix, WiShowers, WiStrongWind } from 'react-icons/wi';

interface HourlyForecast {
    hours: Hour[];
    time: Date;
}

interface HourlyData {
    itemHour: Date;
    itemsInHour: Hour;
}

export const HourlyForecast = ({ hours, time }: HourlyForecast) => {

    const hour = time.getHours() + 1;

    const myHoursArray = useMemo(() => {
        const data: HourlyData[] = [];
        for (let i = 0; i <= 5; i++) {
            if (hour <= hours.length) {
                data.push({
                    itemHour: new Date(hours[hour + i].time),
                    itemsInHour: hours[hour + i]
                });
            }
        }
        return data;
    }, [time, hours]);


    const renderIcon = (condition: number) => {


        if (condition === 1003) {
            return <WiDayCloudy className={styles.Icon} />
        }
        else if (condition === 1000) {
            return <WiDaySunny className={styles.Icon} />
        }
        else if (condition === 1006) {
            return <WiCloud className={styles.Icon} />
        }
        else if (condition === 1009) {
            return <WiCloudy className={styles.Icon}/>
        }
        else if (condition === 1030) {
            return <></>
        }
        else if (condition === 1063) {
            return <></>
        }
        else if (condition === 1183) {
            return <WiShowers className={styles.Icon} />

        }


        return <></>;
    }

    return (
        <>

            <div className={styles.hourlyForecastContainer}>
                <span className={styles.hourlyForecastHeading}>Hourly Forecast</span>
                <div className={styles.hourlyBox} >
                    {myHoursArray.map(item => (
                        <div className={styles.itemBox}>
                            <div className={styles.hour}>
                                <span className={styles.hourSpan}>{item.itemHour.getHours()}</span>
                            </div>
                            <div className={styles.hourlyIconCondition}>
                                {renderIcon(item.itemsInHour.condition.code)}
                                <span className={styles.hourlyConditionSpan}>{item.itemsInHour.condition.text}</span>
                            </div>
                            <div className={styles.hourlyTemp}>
                                <span>{item.itemsInHour.temp_c.toFixed()}° C</span>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>

        </>
    )

}