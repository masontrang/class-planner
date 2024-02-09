import './OverviewContainer.css';
import { useNavigate } from 'react-router-dom';
import OverviewButton from './OverviewButton';
function OverviewContainer(props) {
  let navigate = useNavigate();

  function clickHandler(id) {
    navigate(`/class/${id}`);
  }

  return (
    <div className="OverviewContainer">
      {props.classes.map((item) => (
        <OverviewButton
          id={item.id}
          date={item.date}
          onClick={() => clickHandler(item.id)}
        />
      ))}
      <button
        className="OverviewButton"
        onClick={() => navigate('/classCreation')}
      >
        +
      </button>
    </div>
  );
}

export default OverviewContainer;
