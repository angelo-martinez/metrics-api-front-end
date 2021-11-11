import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from 'react-modal';
import Home from './components/Home';
import Metric from './components/Metric';
import NavBar from './components/NavBar';
import { close, label, input, submit } from './css/modal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '700px',
  },
};

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
        style={customStyles}
      >
        <button onClick={closeModal} className={close}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <label className={label}>
            Metric Name:
            <input className={input} type='text' required name='metricName' />
          </label>
          <button type='submit' className={submit}>
            submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default App;
