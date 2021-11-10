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
                    Created: {record.timestamp} Value: {record.value}
                  </div>
                );
              })}
            </td>
            <td className={td}>{metric.timestamp}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Metric;
