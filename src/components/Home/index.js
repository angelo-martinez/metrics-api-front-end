import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper';
import { box, grid, title } from './styles.module.css';

const Home = ({ metrics }) => {
  console.log(metrics);
  return (
    <Wrapper>
      <div className={grid}>
        {metrics.map((metric, i) => {
          return (
            <div className={box} key={i}>
              <h2 className={title}>{metric.name}</h2>
              <div className='btns-row'>
                <button className='btn'>Delete</button>
                <Link to={`/metric/${metric.id}`}>Open</Link>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Home;
