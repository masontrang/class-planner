import { useEffect, useState } from 'react';
import './Sequence.css';
import DetailSelector from './DetailSelector';
function Sequence({
  isView,
  length,
  sequence,
  updateSequence,
  removeSequence,
  handleAddSequence,
}) {
  const [moves, setMoves] = useState();
  const [moveTypes, setMoveTypes] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  // A function to handle the change of the song name
  const handleSongChange = (e) => {
    const newSong = e.target.value;
    updateSequence({ ...sequence, song: newSong });
  };

  // A function to handle the change of the notes
  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    updateSequence({ ...sequence, notes: newNotes });
  };

  // A function to handle the addition of a new move
  const handleAddMove = () => {
    const newMoves = [...sequence.moves, ''];
    updateSequence({ ...sequence, moves: newMoves });
  };

  // A function to handle the removal of a move by index
  const handleRemoveMove = (index) => {
    const newMoves = sequence.moves.filter((_, i) => i !== index);
    updateSequence({ ...sequence, moves: newMoves });
  };

  // A function to handle the change of a move by index
  const handleMoveChange = (index, e) => {
    const newMove = e.target.value;
    const newMoves = sequence.moves.map((move, i) =>
      i === index ? newMove : move
    );
    updateSequence({ ...sequence, moves: newMoves });
  };

  function selectMove(index, value) {
    const newMove = value;
    const newMoves = sequence.moves.map((move, i) =>
      i === index ? newMove : move
    );
    updateSequence({ ...sequence, moves: newMoves });
    setShowSelector(false);
  }

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
    <div className="sequence">
      <div className="sequence-header">
        <label>🎵</label>

        {!isView ? (
          <>
            <input
              type="text"
              value={sequence.song}
              onChange={handleSongChange}
              placeholder="Song name"
            />
            <div className="buttonContainer">
              {length > 1 && (
                <button onClick={removeSequence} className="button-sm">
                  {/* Remove Song */} -
                </button>
              )}
              <button onClick={handleAddSequence} className="button-sm-confirm">
                {/* Add Song */} +
              </button>
            </div>
          </>
        ) : (
          <p className="text" style={{ fontWeight: 'bold  ' }}>
            {sequence.song}
          </p>
        )}
      </div>
      <div className="sequence-body">
        <div className="moves">
          {sequence.moves.map((move, i) => (
            <div key={i} className="move">
              🧘🏻
              {!isView ? (
                <input
                  type="text"
                  value={move}
                  onChange={(e) => handleMoveChange(i, e)}
                  placeholder="Move name"
                />
              ) : (
                <p className="text">{move}</p>
              )}
              {/* {move ? (
                <p
                  onClick={() => {
                    setShowSelector(!showSelector);
                  }}
                >
                  {move}
                </p>
              ) : (
                <button
                  className="button-sm"
                  onClick={() => {
                    setShowSelector(!showSelector);
                  }}
                >
                  select move
                </button>
              )} */}
              {/* <select>
                <option>Option</option>
              </select> */}
              {showSelector && (
                <DetailSelector
                  selectMove={selectMove}
                  i={i}
                  key={i}
                  onClick={() => {
                    setShowSelector(false);
                  }}
                />
              )}
              {!isView && (
                <div className="buttonContainer">
                  {sequence.moves.length > 1 && (
                    <button
                      className="button-sm"
                      onClick={() => handleRemoveMove(i)}
                    >
                      {/* Remove move */} -
                    </button>
                  )}
                  {i === sequence.moves.length - 1 && (
                    <button
                      onClick={handleAddMove}
                      className="button-sm-confirm"
                    >
                      {/* Add move */} +
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* <div className="notes">
          <textarea
            className="notesArea"
            value={sequence.notes}
            onChange={handleNotesChange}
            placeholder="Notes"
          />
        </div> */}
      </div>
    </div>
  );
}
export default Sequence;
