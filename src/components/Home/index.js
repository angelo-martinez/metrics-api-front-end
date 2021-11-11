import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper';
import { box, grid, title, row } from './styles.module.css';
import { deleteBtn, yellowBtn } from '../../css/button.module.css';

const Home = ({ metrics, fetchMetrics }) => {
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/metrics/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then(() => fetchMetrics())
      .catch((e) => console.error(e));
  };

  return (
    <Wrapper>
      <div className={grid}>
        {metrics.map((metric, i) => {
          return (
            <div className={box} key={i}>
              <h2 className={title}>{metric.name}</h2>
              <div className={row}>
                <button
                  className={deleteBtn}
                  onClick={() => handleDelete(metric.id)}
                >
                  Delete
                </button>
                <Link to={`/metric/${metric.id}`} className={yellowBtn}>
                  Open
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Home;
