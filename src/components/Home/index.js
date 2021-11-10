import Wrapper from '../Wrapper';
import { box, grid } from './styles.module.css';

const Home = ({ metrics }) => {
  console.log(metrics);
  return (
    <Wrapper>
      <div className={grid}>
        {metrics.map((metric, i) => {
          return (
            <div className={box} key={i}>
              <h2 className='title'>{metric.name}</h2>
              <div className='btns-row'>
                <button className='btn'>Delete</button>
                <button className='btn'>Open</button>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Home;
