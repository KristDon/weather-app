import styles from './Overview.module.css'
import { WiStrongWind, WiDirectionUp, WiRainMix, WiWindy, WiDaySunny } from "react-icons/wi"

interface OverviewBoxProps {
    title: string;
    icon: IconType;
    displayValue: string;

}

export enum IconType {
    RainChance,
    Wind,
    Pressure,
    Uv,
}

export const OverviewBox = ({ title, displayValue, icon }: OverviewBoxProps) => {

    const renderIcon = () => {
        if (icon === IconType.Wind) {
            return <WiStrongWind className={styles.weatherIcon} />
        }
        else if (icon === IconType.RainChance) {
            return <WiRainMix className={styles.weatherIcon} />
        }
        else if (icon === IconType.Pressure) {
            return <WiWindy className={styles.weatherIcon} />
        }
        else if (icon === IconType.Uv) {
            return <WiDaySunny className={styles.weatherIcon} />
        }

        return <></>;
    }

    return (
        <div className={styles.overviewBox}>
            {renderIcon()}
            <div className={styles.wheatherDetails}>
                <span className={styles.wheatherDetailsText1}>{title}</span>
                <span className={styles.wheatherDetailsText2}>{displayValue}</span>
            </div>
            <div className={styles.overviewThirdPart}>
            </div>
        </div>

    )
}