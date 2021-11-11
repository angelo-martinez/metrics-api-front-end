import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
import Home from './components/Home';
import Metric from './components/Metric';
import NavBar from './components/NavBar';
import modalStyles from './utils/modalStyles';
import { close, label, input } from './css/modal.module.css';
import { yellowBtn } from './css/button.module.css';

Modal.setAppElement('#root');

const App = () => {
  const [metrics, setMetrics] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const fetchMetrics = () => {
    fetch('http://localhost:5000/metrics', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => setMetrics(data.metrics))
      .catch((e) => console.error(e));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: e.target.elements.metricName.value }),
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        fetchMetrics();
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <>
      <Router>
        <NavBar openModal={openModal} />
        <Routes>
          <Route
            exact
            path='/'
            element={
              metrics.length > 0 && (
                <Home metrics={metrics} fetchMetrics={fetchMetrics} />
              )
            }
          />
          <Route path='/metric/:id' element={<Metric />} />
        </Routes>
      </Router>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <button onClick={closeModal} className={close}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <label className={label}>
            Metric Name:
            <input className={input} type='text' required name='metricName' />
          </label>
          <button type='submit' className={yellowBtn}>
            submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default App;
