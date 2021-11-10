import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Metric from './components/Metric';
import NavBar from './components/NavBar';

const App = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/metrics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => setMetrics(data.metrics))
      .catch((e) => console.error(e));
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          exact
          path='/'
          element={metrics.length > 0 && <Home metrics={metrics} />}
        />
        <Route
          path='/metric/:id'
          element={metrics.length > 0 && <Metric metrics={metrics} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
