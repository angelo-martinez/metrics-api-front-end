import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Metric from './components/Metric';
import NavBar from './components/NavBar';

const App = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/metrics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/metric' element={<Metric />} />
      </Routes>
    </Router>
  );
};

export default App;
