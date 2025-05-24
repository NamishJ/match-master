import type React from 'react'
import styles from './HomePage.module.css'
import RubiksText from '../components/RubiksText';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <div className={`${styles['home-page']} ${styles['bg-animation']}`}>
            <div className={styles['container']}>
                <RubiksText className={styles['title-container']} text={'MATCH MASTER'} />
                <div className={styles['button-container']}>
                    <button 
                    className={styles['mm-button']}
                    onClick={() => navigate('/game')}>
                        Play
                    </button>
                    <button className={styles['mm-button']}
                    onClick={() => navigate('/leaderboard')}>
                        Leaderboard
                    </button>
                </div>
            </div>
        </div>
    )

}

export default HomePage;