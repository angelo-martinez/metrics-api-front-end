import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import Wrapper from '../Wrapper';
import { table, title, th, td, btn } from './styles.module.css';
import { close, label, input, submit } from '../../css/modal.module.css';

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

const Metric = () => {
  let { id } = useParams();
  const [metric, setMetric] = useState({});
  const [recordSet, setRecordSet] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const fetchMetric = () => {
    fetch(`http://localhost:5000/metrics/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => setMetric(data))
      .catch((e) => console.error(e));
  };

  const fetchRecordSet = () => {
    fetch(`http://localhost:5000/metrics/${id}/recordset`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => setRecordSet(data.values))
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
    fetch(`http://localhost:5000/metrics/${id}/recordset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: e.target.elements.value.value }),
    })
      .then((response) => response.json())
      .then(() => {
        closeModal();
        fetchRecordSet();
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchMetric();
    fetchRecordSet();
  }, []);

  const formatDate = (date) => {
    const dt = new Date(date);
    return `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt
      .getDate()
      .toString()
      .padStart(2, '0')}/${dt.getFullYear().toString().padStart(4, '0')} ${dt
      .getHours()
      .toString()
      .padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
  };

  console.log({ metric, recordSet });

  return (
    <>
      <Wrapper>
        <button className={btn} onClick={openModal}>
          Add Value
        </button>
        <table className={table}>
          <caption className={title}>{metric.name}</caption>
          <thead>
            <tr>
              <th className={th}>Value</th>
              <th className={th}>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={td}>
                {recordSet.map((record, i) => {
                  return (
                    <div key={i}>
                      <strong>Created:</strong> {formatDate(record.timestamp)}{' '}
                      <strong>Value:</strong>
                      {record.value}
                    </div>
                  );
                })}
              </td>
              <td className={td}>{formatDate(metric.timestamp)}</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
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
            Value
            <input
              type='number'
              className={input}
              required
              name='value'
              step='0.01'
            />
          </label>
          <button type='submit' className={submit}>
            submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Metric;
