import { useEffect, useState } from 'react';
import styles from './SunriseSunset.module.css';
import { FaArrowDown } from 'react-icons/fa';
import { WiSunrise, WiSunset } from 'react-icons/wi';

interface SunriseSunsetProps {
    sunrise: string;
    sunset: string;
    time: Date;

}




export const SunriseSunset = ({ sunrise, sunset, time }: SunriseSunsetProps) => {

    const [hide, setHide] = useState(true);

    const toggleHide = () => {
        setHide(!hide);
    };


    const getSunriseTo24H = () => {
        const d = new Date("5/30/2023 " + sunrise);
        return d.getHours() + ':' + d.getMinutes();
    }

    const getSunsetTo24H = () => {
        const d = new Date("5/30/2023 " + sunset);
        return d.getHours() + ':' + d.getMinutes();
    }



    return (
        <>
            <div className={styles.headingToggle}>
                <div className={styles.heading}>
                    <span>Sunrise & Sunset</span>
                </div>
                <div className={styles.toggle} onClick={toggleHide}>
                    <span>Toggle</span>
                    <FaArrowDown />
                </div>
            </div>
            <div style={{ display: hide ? "block" : "none" }} className={styles.ssBox}>
                <div className={styles.sunriseBox}>
                    <WiSunrise className={styles.icon} />
                    <div className={styles.headingTime}>
                        <span>Sunrise</span>
                        <span>{getSunriseTo24H()}</span>
                    </div>
                </div>
            </div>
            <div style={{ display: hide ? "block" : "none" }} className={styles.ssBox}>
                <div className={styles.sunsetBox} >
                    <WiSunset className={styles.icon} />
                    <div className={styles.headingTime}>
                        <span>Sunset</span>
                        <span>{getSunsetTo24H()}</span>
                    </div>
                </div>
            </div>
        </>
    )

}



