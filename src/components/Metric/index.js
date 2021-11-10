import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../Wrapper';
import { table, title, th, td } from './styles.module.css';

const Metric = () => {
  let { id } = useParams();
  const [metric, setMetric] = useState({});
  const [recordSet, setRecordSet] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/metrics/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setMetric(data);
        return fetch(`http://localhost:5000/metrics/${id}/recordset`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      })
      .then((response) => response.json())
      .then((data) => setRecordSet(data.values))
      .catch((e) => console.error(e));
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
    <Wrapper>
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
  );
};

export default Metric;
