import { useParams } from 'react-router-dom';
import Wrapper from '../Wrapper';
import { table, title, th, td } from './styles.module.css';

const Metric = ({ metrics }) => {
  console.log(metrics);
  let { id } = useParams();
  const metric = metrics.find((ele) => ele.id == id);
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
            <td className={td}>{metric.id}</td>
            <td className={td}>{metric.timestamp}</td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

export default Metric;
