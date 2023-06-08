import React from 'react';
import styles from './Header.module.css'
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai"
import { FaSearch } from "react-icons/fa"
import { getAutoCompleteApiResponse } from '../../services/weatherService';
import AsyncSelect from 'react-select/async';
import { Options } from 'react-select';


interface HeaderProps {
    localtime: Date;
    onLocationChange: (location: string) => void;
}

interface SearchOption {
    label: string;
    value: string;
}

export const Header = ({ localtime, onLocationChange }: HeaderProps) => {


    const year = localtime.getFullYear();
    const monthShort = localtime.toLocaleString('default', { month: 'short' });
    const monthLong = localtime.toLocaleString('default', { month: 'long' });
    const dayShort = localtime.toLocaleString('default', { weekday: 'short' });
    const dayLong = localtime.toLocaleString('default', { weekday: 'long' });

    const loadOptions = (
        inputValue: string,
        callback: (options: SearchOption[]) => void
    ) => {
        getAutoCompleteApiResponse(inputValue).then(data => {

            const options: SearchOption[] = [];

            data?.forEach(item => {
                options.push({
                    label: item.name,
                    value: item.name
                })
            });

            callback(options);
        });
    };

    return (

        <div className={styles.container}>
            <div className={styles.dateContainer}>
                <div className={styles.monthDate}>
                    <span>{monthLong} {year}</span>
                </div>
                <div className={styles.dayDate}>
                    <span>{dayLong},{monthShort} {dayShort} {year}</span>
                </div>
            </div>

            <div className={styles.searchContainer}>
                <AsyncSelect cacheOptions loadOptions={loadOptions} placeholder={'Search Location'}
                    onChange={(newValue) => {
                        if (newValue) {
                            onLocationChange(newValue.value)
                        }
                    }} />
            </div>


            <div className={styles.buttonContainer}>
                <button>
                    <AiOutlineBell />
                </button>
                &nbsp;  &nbsp;
                <button>
                    <AiOutlineUser />
                </button>
            </div>









        </div>
    )
}