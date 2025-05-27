import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RaceList from './components/RaceList';
import PastResults from './components/PastResults';
import RacePrediction from './components/RacePrediction';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<RaceList />} />
            <Route path="/past-results" element={<PastResults />} />
            <Route path="/prediction/:raceId" element={<RacePrediction />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;