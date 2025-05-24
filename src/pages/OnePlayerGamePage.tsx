import OnePlayerGame from '../components/OnePlayerGame'
import RubiksText from '../components/RubiksText'
import styles from '../pages/OnePlayerPage.module.css'

function OnePlayerGamePage() {
  // function names

  return (
    <div>
        <h1 className={styles['navbar']}>
            <RubiksText text='MATCH MASTER' />
        </h1>
        <OnePlayerGame />
    </div>
  )
  
}

export default OnePlayerGamePage
