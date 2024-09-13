import React from 'react';
import {  Routes, Route, } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import Quiz from './components/Quiz';
import QuizInstructions from './components/quiz/QuizInstructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
import Signup from './components/Signup';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import AllScores from './components/AllScores';
import MyScore from './components/MyScore';

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/allscores" element={<AllScores />} />
      <Route path="/myscores" element={<MyScore />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/teacherdashboard" element={<TeacherDashboard />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/play/instructions" element={<QuizInstructions />} />
      <Route path="/play/quiz" element={<Play navigate={ navigate } />} />
      <Route path="/play/quizSummary" element={<QuizSummary location={location} />} />
    </Routes>  
  );
}

export default App;