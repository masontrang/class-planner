import './DetailSelector.css';
import { useEffect, useState } from 'react';
function DetailSelector(props) {
  const [moves, setMoves] = useState();
  const [moveTypes, setMoveTypes] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8000/moves')
      .then((response) => response.json())
      .then((data) => {
        setMoves(data);
      });

    fetch('http://localhost:8000/movetypes')
      .then((response) => response.json())
      .then((moveTypes) => {
        setMoveTypes(moveTypes);
      });
  }, []);
  return (
    <div classname="DetailSelector">
      <div
        style={{
          position: 'absolute',
          right: '0px',
          top: '0px',
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          width: '30vw',
          height: '100vh',
          backgroundColor: '#b3f2ddff',
          zIndex: '1',
          opacity: '90%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <label>Add Move</label>
          <button className="BigButton" onClick={() => {}}>
            Add move
          </button>
        </div>
        {moves &&
          moves.map((move) => (
            <div>
              <button
                className="BigButton"
                onClick={() => {
                  props.selectMove(props.i, move.name);
                }}
              >
                {move.name} - {move.moveType.name}
              </button>
            </div>
          ))}

        <button onClick={props.onClick} className="BigButton">
          Close
        </button>
      </div>
    </div>
  );
}

export default DetailSelector;
