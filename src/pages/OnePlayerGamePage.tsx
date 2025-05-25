import { Link } from 'react-router'
import OnePlayerGame from '../components/OnePlayerGame'
import RubiksText from '../components/RubiksText'
import styles from '../pages/OnePlayerPage.module.css'

function OnePlayerGamePage() {
  // function names

  return (
    <div className={styles['page']}>
        <span className={styles['navbar']}>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <RubiksText className={styles['title-container']} text='MATCH MASTER' />
          </Link>
        </span>
        <div className={styles['game']}>
          <OnePlayerGame />
        </div>
    </div>
  )
  
}

export default OnePlayerGamePage
