import { wrapper } from './styles.module.css';

const Wrapper = ({ children }) => {
  return <div className={wrapper}>{children}</div>;
};

export default Wrapper;
