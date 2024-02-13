import NavBar from '../components/NavBar';
import ClassCreationContainer from '../components/ClassCreationContainer';
import './ClassCreation.css';
import Selector from '../components/DetailSelector';
import { useState, useEffect } from 'react';
function ClassCreation() {
  const [isEdit, setIsEdit] = useState(false);

  const newData = {
    id: '0',
    name: '',
    date: '',
    sections: [
      {
        id_1: '',
        name: '',
        song1: '',
        moves1: [],
        song2: '',
        moves2: [],
        notes: '',
      },
    ],
  };

  const [data, setData] = useState(newData);
  const [moves, setMoves] = useState();

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8000/moves')
      .then((response) => response.json())
      .then((data) => {
        setMoves(data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSectionChange = (e, index) => {
    const { name, value } = e.target;
    const sections = [...data.sections];
    sections[index] = { ...sections[index], [name]: value };
    setData({ ...data, sections });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with data
    console.log(data);
    fetch('http://localhost:8000/classes/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(function (res) {
        console.log('res', res);
        // setMessage(res.message);
      })
      .catch(function (res) {
        console.log(res);
      });
  };
  function clickHandler() {
    const newSection = {
      id: data.sections.length + 1,
      name: '',
      song1: '',
      moves1: [''],
      song2: '',
      moves2: [''],
      notes: '',
    };
    const updatedClass1 = {
      ...data,
      sections: [...data.sections, newSection],
    };

    setData(updatedClass1);
  }
  return (
    <div className="Page">
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
        {moves &&
          moves.map((move) => (
            <div>
              <button className="BigButton">
                {move.name}
                {/* {move.moveType.name} */}
              </button>
            </div>
          ))}
      </div>
      <div className="ClassView">
        {/* <NavBar title="CLASS CREATION" /> */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Class Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
          <label htmlFor="date">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={data.date}
            onChange={handleChange}
          />
          {data.sections.map((section, index) => (
            <div key={section.id}>
              <h3>Section {index + 1}</h3>
              <label htmlFor={`section-name-${index}`}>Section Name:</label>
              <input
                type="text"
                id={`section-name-${index}`}
                name="name"
                value={section.name}
                onChange={(e) => handleSectionChange(e, index)}
              />
              <label htmlFor={`section-song1-${index}`}>Song 1:</label>
              <input
                type="text"
                id={`section-song1-${index}`}
                name="song1"
                value={section.song1}
                onChange={(e) => handleSectionChange(e, index)}
              />
              <label htmlFor={`section-moves1-${index}`}>Moves 1:</label>
              <input
                type="text"
                id={`section-moves1-${index}`}
                name="moves1"
                value={section.moves1.join(', ')}
                onChange={(e) =>
                  handleSectionChange(
                    {
                      target: {
                        name: 'moves1',
                        value: e.target.value.split(', '),
                      },
                    },
                    index
                  )
                }
              />
              {section.song2 && (
                <>
                  <label htmlFor={`section-song2-${index}`}>Song 2:</label>
                  <input
                    type="text"
                    id={`section-song2-${index}`}
                    name="song2"
                    value={section.song2}
                    onChange={(e) => handleSectionChange(e, index)}
                  />
                  <label htmlFor={`section-moves2-${index}`}>Moves 2:</label>
                  <input
                    type="text"
                    id={`section-moves2-${index}`}
                    name="moves2"
                    value={section.moves2.join(', ')}
                    onChange={(e) =>
                      handleSectionChange(
                        {
                          target: {
                            name: 'moves2',
                            value: e.target.value.split(', '),
                          },
                        },
                        index
                      )
                    }
                  />
                </>
              )}
              <label htmlFor={`section-notes-${index}`}>Notes:</label>
              <textarea
                id={`section-notes-${index}`}
                name="notes"
                value={section.notes}
                onChange={(e) => handleSectionChange(e, index)}
              />
            </div>
          ))}
          <button className="BigButton" onClick={clickHandler}>
            + Add Section
          </button>
          <button type="submit" className="BigButtonSave">
            Save
          </button>
          {/* {message} */}
        </form>

        {/* <div style={{ display: 'flex' }}>
          <button className="BigButtonSave" onClick={() => setIsEdit(!isEdit)}>
            Save
          </button>

          <button
            className="BigButtonCancel"
            onClick={() => setIsEdit(!isEdit)}
          >
            Cancel
          </button>
        </div> */}
      </div>
      {/* <ClassCreationContainer classes={classes} /> */}
    </div>
  );
}

export default ClassCreation;
