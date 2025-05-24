import OnePlayerGame from '../components/OnePlayerGame'
import RubiksText from '../components/RubiksText'
import styles from '../pages/OnePlayerPage.module.css'

function OnePlayerGamePage() {
  // function names

  return (
    <div>
        <span className={styles['navbar']}>
            <RubiksText className={styles['title-container']} text='MATCH MASTER' />
        </span>
        <OnePlayerGame />
    </div>
  )
  
}

export default OnePlayerGamePage
