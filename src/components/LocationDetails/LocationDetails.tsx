import { useEffect, useMemo, useState } from 'react';
import styles from './LocationDetails.module.css';
import { WiCloud, WiCloudy, WiDayCloudy, WiDaySunny, WiRain, WiShowers } from 'react-icons/wi';



interface LocationDetailsProps {
    time: Date;
    city: string;
    country: string;
    region: string;
    tempreture: number;
    condition: number;
    conditionText: string;
    timezone: string;

}



export const LocationDetails = ({ time, city, country, region, tempreture, condition, timezone, conditionText }: LocationDetailsProps) => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    const renderIcon = (condition: number) => {
        

        if (condition === 1003) {
            return <WiDayCloudy className={styles.leftDetailsIcon} />
        }
        else if (condition === 1000) {
            return <WiDaySunny className={styles.leftDetailsIcon} />
        }
        else if (condition === 1006) {
            return <WiCloud className={styles.leftDetailsIcon} />
        }
        else if (condition === 1009) {
            return <WiCloudy className={styles.leftDetailsIcon}/>
        }
        else if (condition === 1030) {
            return <></>
        }
        else if (condition === 1063) {
            return <></>
        }
        else if (condition === 1183){
            return <WiShowers className={styles.leftDetailsIcon} />
            
        }


        return <></>;
    }


    return (
        <>
            <div className={styles.timePlace}>
                <div className={styles.place}>
                    <span className={styles.placeHeadingFirst}>{region}</span>
                    <span className={styles.placeHeadingSecond}>{city},{country}</span>
                </div>
                <div className={styles.time}>
                    <span className={styles.timeHeading}>
                        {date.toLocaleTimeString('en-GB', { timeZone: timezone, hour12: false })}
                    </span>
                </div>
            </div>

            <div className={styles.weatherCondition}>
                <div className={styles.leftDetails}>
                    {renderIcon(condition)}
                    <span className={styles.leftDetailsText}>
                        {tempreture}° C
                    </span>
                </div>
                <div className={styles.rightDetails}>
                    <span className={styles.rightDetailsText}>
                        {conditionText}
                    </span>
                </div>
            </div >
            <hr className={styles.lineBetween} />
        </>
    )

}