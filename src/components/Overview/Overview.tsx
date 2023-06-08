import styles from './Overview.module.css'
import { BsArrowUpRight } from "react-icons/bs"
import { IconType, OverviewBox } from './OverviewBox'

interface OverviewProps {
    windSpeed: number;
    pressure: number;
    uvIndex: number;
    rainChance: number;
}


export const Overview = ({windSpeed, pressure, uvIndex, rainChance}: OverviewProps) => {
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.overviewContainer}>
                    <span className={styles.overview}>Today overview</span>
                </div>
                <div className={styles.moreDetails}>
                    <div>
                        <a>More Details </a>
                    </div>
                    <div className={styles.detailsIcon}>
                        <a className={styles.icon}><BsArrowUpRight /></a>
                    </div>
                </div>
            </div>
            <div className={styles.containerBox}>
                <OverviewBox  title={"Wind Speed"} displayValue={`${windSpeed} km/h`} icon={IconType.Wind} />
                <OverviewBox title={"Rain Chance"} displayValue={`${ rainChance } %`} icon={IconType.RainChance} />
            </div>
            <div className={styles.containerBox}>
                <OverviewBox title={"Pressure"} displayValue={`${ pressure } hpa`} icon={IconType.Pressure} />

                <OverviewBox title={"Uv Index"} displayValue={`${ uvIndex }`} icon={IconType.Uv} />
            </div>
        </>
    )



}