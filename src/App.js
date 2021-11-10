import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('');
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch('http://localhost:5000/metrics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(e => console.log(e))
  }, [])
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
