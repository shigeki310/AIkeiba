import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RaceList from './components/RaceList';
import RaceListByDay from './components/RaceListByDay';
import PastRaces from './components/PastRaces';
import RacePrediction from './components/RacePrediction';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import UserSettings from './components/UserSettings';
import PremiumService from './components/PremiumService';

function App() {
  return (
    <div className="min-h-screen bg-[#e8f5e9] flex flex-col">
      <Navbar />
      <div className="bg-gray-50 py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            AIKeibaへようこそ
          </h1>
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            AIKeibaは最新の人工知能技術と統計分析を組み合わせた独自のアルゴリズムを使用し、競馬予想の新しい形を提案しています。データに基づいた客観的な予測で、あなたの競馬体験をより豊かにします。是非、ご覧ください！
          </p>
        </div>
      </div>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Routes>
          <Route path="/" element={<RaceList />} />
          <Route path="/races/:venue/:day" element={<RaceListByDay />} />
          <Route path="/past-races" element={<PastRaces />} />
          <Route path="/prediction/:raceId" element={<RacePrediction />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/premium" element={<PremiumService />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;