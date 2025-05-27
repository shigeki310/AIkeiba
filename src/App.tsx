import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RaceList from './components/RaceList'
import PastResults from './components/PastResults'
import RacePrediction from './components/RacePrediction'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className="min-h-screen bg-[#e8f5e9]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<RaceList />} />
          <Route path="/past-results" element={<PastResults />} />
          <Route path="/prediction/:raceId" element={<RacePrediction />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </div>
  )
}

export default App