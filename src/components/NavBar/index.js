import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper';
import { bar, title, row, btn } from './styles.module.css';

const NavBar = ({ openModal }) => {
  return (
    <nav className={bar}>
      <Wrapper>
        <div className={row}>
          <Link to='/' className={title}>
            Metrics Admin
          </Link>
          <button className={btn} onClick={openModal}>
            Add Metric
          </button>
        </div>
      </Wrapper>
    </nav>
  );
};

export default NavBar;
