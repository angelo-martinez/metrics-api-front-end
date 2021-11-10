import Wrapper from '../Wrapper';
import { bar, title, row } from './styles.module.css';

const NavBar = () => {
  return (
    <nav className={bar}>
      <Wrapper>
        <div className={row}>
          <h1 className={title}>Metrics Admin</h1>
          <button className='btn'>Add Metric</button>
        </div>
      </Wrapper>
    </nav>
  );
};

export default NavBar;
