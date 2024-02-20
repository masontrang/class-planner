import './ClassView.css';
import data from '../data.json';
import Section from './Section';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ClassView(props) {
  let { classId } = useParams();
  //   const [classId, setClassId] = useState(props.classId);
  //   const [class1, setClass1] = useState(false);

  //   useEffect(() => {
  //     const selectedClass = data.classes.find(
  //       (obj) => obj.id === Number(classId)
  //     );
  //     console.log('selected', selectedClass);
  //     console.log('classview', classId);
  //     setClass1(selectedClass);
  //   }, [classId]);

  const [data, setData] = useState();
  const [date, setDate] = useState();
  // let date = 0;
  useEffect(() => {
    // Fetch data from the backend
    fetch(`http://localhost:8000/classes/${Number(classId)}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data[0]);
        const inputDate = new Date(data[0].date);
        const date = `${inputDate.getMonth() + 1}/${inputDate.getDate()}/${
          inputDate.getFullYear() % 100
        }`;
        setDate(date);
      });
  }, []);
  console.log('fetch data', data);

  const [isEdit, setIsEdit] = useState(false);

  function clickHandler() {
    const newSection = {
      id: '01',
      name: 'New Section',
      song1: 'intro song1',
      moves1: ['intro move1', 'intro move2', 'intro move3'],
      song2: 'song2',
      moves2: ['intro move1', 'intro move2', 'intro move3'],
      notes: 'notes1',
    };
    const updatedClass1 = {
      ...data,
      sections: [...data.sections, newSection],
    };

    setData(updatedClass1);
  }

  return (
    <div className="ClassView">
      {data && (
        <div className="data-header-view">
          {/* <h1>Class: {data.id}</h1> */}
          <h2>{data.name}</h2>
          <h3>Date: {date}</h3>
        </div>
      )}

      <div className="Sections">
        {/* editing */}
        {isEdit ? (
          <>
            {data &&
              data.sections.map((section) => (
                <div className="Section">
                  <form>
                    <label className="name">Section:</label>
                    <input className="name"></input>

                    <label>🎵</label>
                    <input className="song"></input>

                    {section &&
                      section.moves1.map((move) => (
                        <div className="moves">
                          <label>Move</label>
                          <input className="move"></input>
                        </div>
                      ))}
                  </form>
                </div>
              ))}

            <div style={{ display: 'flex' }}>
              <button
                className="BigButtonSave"
                onClick={() => setIsEdit(!isEdit)}
              >
                Save
              </button>

              <button
                className="BigButtonCancel"
                onClick={() => setIsEdit(!isEdit)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          // not editing
          <>
            {data &&
              data.sections.map((section) => (
                <Section section={section} isView={true} />
              ))}
            {/* <button className="BigButton" onClick={() => setIsEdit(!isEdit)}>
              Edit
            </button> */}
          </>
        )}
      </div>
    </div>
  );
}

export default ClassView;
