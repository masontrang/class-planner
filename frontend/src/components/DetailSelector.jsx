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

  const moveInput = (
    <div>
      <input></input>
    </div>
  );
  function addMove() {
    const newMove = {
      name: '',
      moveType: '',
      description: '',
    };
    setMoves([...moves, newMove]);
  }
  return (
    <div classname="DetailSelector">
      <div
        style={{
          position: 'absolute',
          right: '0px',
          top: '0px',
          // borderTopLeftRadius: '1rem',
          // borderBottomLeftRadius: '1rem',
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
        <div></div>
        {moves &&
          moves
            .sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            .map((move) =>
              move.name ? (
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
              ) : (
                <div>
                  <input className="BigButton"></input>
                </div>
              )
            )}

        <button className="BigButton" onClick={addMove}>
          Add move
        </button>
        <button onClick={props.onClick} className="BigButton">
          Close
        </button>
      </div>
    </div>
  );
}

export default DetailSelector;
