import './OverviewContainer.css';
import { useNavigate } from 'react-router-dom';
import OverviewButton from './OverviewButton';
import { useEffect, useState } from 'react';
function OverviewContainer(props) {
  let navigate = useNavigate();

  function clickHandler(id) {
    navigate(`/class/${id}`);
  }

  const [data, setData] = useState();

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8000/classes')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  console.log('fetch data', data);

  return (
    <div className="OverviewContainer">
      {/* {data && data.message} */}
      {data &&
        data.map((item) => (
          <OverviewButton
            name={item.name}
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
