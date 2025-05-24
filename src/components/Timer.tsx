import React, { 
    useEffect, 
    type Dispatch, 
    type SetStateAction } 
from 'react';
import styles from './Timer.module.css'
import { useNavigate } from 'react-router-dom';

type TimerProps = {
    isRunning: boolean;
    time: number;
    setTime: Dispatch<SetStateAction<number>>;
}

const Timer: React.FC<TimerProps> = ( { isRunning, time, setTime} ) => {
    
    const navigate = useNavigate();

    // increment every second
    useEffect(() => {
        let interval: number | undefined;

        if (isRunning) {
            interval = window.setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, setTime]);

    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    const formattedTime = `${mins}:${seconds}`;

    // padstart used later works on strings and has a min
    // length by padding left side with 2nd param.
    // So '5'.padStart(2, '0') does '05', 5 is length 1 so 0 added as padding
    return (
        <>
            <div className={styles['timer']}>
                <div className={styles['timer-header']}>
                    <h2>{formattedTime}</h2>
                </div>
            </div>
        </>
    );
};

export default Timer;