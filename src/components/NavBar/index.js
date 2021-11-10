import Wrapper from '../Wrapper';

const NavBar = () => {
  return (
    <nav className='bar'>
      <Wrapper>
        <h1 className='title'>Metrics Admin</h1>
        <button className='btn'>Add Metric</button>
      </Wrapper>
    </nav>
  );
};

export default NavBar;
