import { useEffect, useState } from 'react';

import './Editor.css';

function Editor() {
  const [data, setData] = useState();
  const [newMoveName, setNewMoveName] = useState();
  const [newMoveType, setNewMoveType] = useState();
  const [newMoveDescription, setNewMoveDescription] = useState();
  const [newMove, setNewMove] = useState({});
  const [moveTypes, setMoveTypes] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8000/moves')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });

    fetch('http://localhost:8000/movetypes')
      .then((response) => response.json())
      .then((moveTypes) => {
        setMoveTypes(moveTypes);
      });
  }, []);
  console.log('fetch data', data);

  function submitHandler(e) {
    e.preventDefault();
    // do something with data
    console.log('newmove', newMove);
    fetch('http://localhost:8000/addmove', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newMove),
    })
      .then(function (res) {
        console.log('res', res);
        // setMessage(res.message);
        setNewMove({});
      })
      .catch(function (res) {
        console.log(res);
      });
  }
  return (
    <div>
      <div>
        <h1>MOVES</h1>
        {data && (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.map((move) => (
                <tr>
                  <td>{move.name}</td>
                  <td>{move.moveType.name}</td>
                  <td>{move.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h1>MOVE TYPES</h1>
        {moveTypes && (
          <table>
            <thead>
              <th>Name</th>
              <th>ID</th>
            </thead>
            <tbody>
              {moveTypes.map((moveType) => (
                <tr>
                  <td>{moveType.name}</td>
                  <td>{moveType._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h1> ADD MOVES</h1>
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input
            type="text"
            id="newMoveName"
            name="newMoveName"
            value={newMoveName}
            onChange={(e) => setNewMove({ ...newMove, name: e.target.value })}
          />
          {/* <input
            type="text"
            id="newMoveType"
            name="newMoveType"
            value={newMoveType}
            onChange={(e) => setNewMove({ ...newMove, type: e.target.value })}
          /> */}
          <label>Description</label>
          <input
            type="text"
            id="newMoveDescription"
            name="newMoveDescription"
            value={newMoveDescription}
            onChange={(e) =>
              setNewMove({ ...newMove, description: e.target.value })
            }
          />
          <label>Type</label>
          <select
            id="newMoveType"
            name="newMoveType"
            value={newMoveType}
            onChange={(e) =>
              setNewMove({ ...newMove, moveType: e.target.value })
            }
          >
            {moveTypes.map((moveType) => (
              <option value={moveType._id}>{moveType.name}</option>
            ))}
          </select>

          <button type="submit">Add Move</button>
        </form>
        {newMove.newMoveName}
        {newMove.newMoveType}
      </div>
      <h1>SONGS</h1>
    </div>
  );
}

export default Editor;
