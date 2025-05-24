import type React from 'react'
import styles from './Leaderboard.module.css'
import { useNavigate } from 'react-router-dom';

const LeaderboardPage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className={styles['container']}>
            <div className='status'>
                Under Construction
            </div>
            <div>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    )
}

export default LeaderboardPage;