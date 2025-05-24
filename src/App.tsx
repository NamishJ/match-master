import OnePlayerGame from './components/OnePlayerGame'
import './App.css'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import OnePlayerGamePage from './pages/OnePlayerGamePage'
import LeaderboardPage from './pages/Leaderboard'

function App() {
  // function names

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/game' element={<OnePlayerGamePage />} />
      <Route path='/leaderboard' element={<LeaderboardPage/>} />
    </Routes>
  )
  
}

export default App
