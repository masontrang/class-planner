import Plan from '../components/Plan';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import data from '../data.json';

function Home() {
  let navigate = useNavigate();
  function clickHandler(nav) {
    navigate(`/${nav}`);
  }

  console.log('data', data);
  return (
    <div className="Home">
      <h1>Yoga Sculpt</h1>
      <div>
        I like to move it move it
        {/* <button className="button" onClick={() => clickHandler('overview')}>
          OVERVIEW
        </button>
        <button
          className="button"
          onClick={() => clickHandler('classcreation')}
        >
          CLASS CREATION
        </button> */}
      </div>
    </div>
  );
}

export default Home;
