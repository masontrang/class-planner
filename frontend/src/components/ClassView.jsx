import './ClassView.css';
import data from '../data.json';
import Section from './Section';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ClassView(props) {
  let { classId } = useParams();
  //   const [classId, setClassId] = useState(props.classId);
  const [class1, setClass1] = useState(false);

  useEffect(() => {
    const selectedClass = data.classes.find(
      (obj) => obj.id === Number(classId)
    );
    console.log('selected', selectedClass);
    console.log('classview', classId);
    setClass1(selectedClass);
  }, [classId]);

  const [isEdit, setIsEdit] = useState(false);

  function clickHandler() {
    const newSection = {
      id: '01',
      name: 'New Section',
      song1: 'intro song1',
      moves1: ['intro move1', 'intro move2', 'intro move3'],
      song2: 'song2',
      moves2: ['intro move1', 'intro move2', 'intro move3'],
      notes: 'notes',
    };
    const updatedClass1 = {
      ...class1,
      sections: [...class1.sections, newSection],
    };

    setClass1(updatedClass1);
  }

  return (
    <div className="ClassView">
      <div className="header">
        <h1>Class: {class1.id}</h1>
        <h2>{class1.name}</h2>
        <h3>Date: {class1.date}</h3>
      </div>

      <div className="Sections">
        {/* editing */}
        {isEdit ? (
          <>
            {class1 &&
              class1.sections.map((section) => (
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
            <button className="BigButton" onClick={clickHandler}>
              + Add Section
            </button>
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
            {class1 &&
              class1.sections.map((section) => <Section section={section} />)}
            <button className="BigButton" onClick={() => setIsEdit(!isEdit)}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ClassView;
