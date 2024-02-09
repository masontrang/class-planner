import NavBar from '../components/NavBar';
import ClassCreationContainer from '../components/ClassCreationContainer';
import './ClassCreation.css';
import { useState, useEffect } from 'react';
function ClassCreation() {
  const classes = [1, 2, 3, 4, 5];

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
    // const updatedClass1 = {
    //   ...class1,
    //   sections: [...class1.sections, newSection],
    // };

    // setClass1(updatedClass1);
  }

  return (
    <div className="Page">
      <div className="ClassView">
        {/* <NavBar title="CLASS CREATION" /> */}
        <form className="Form">
          <div className="header">
            <label>
              <h1>Class: {'123'}</h1>
            </label>
            <div className="formSection">
              <label>
                <h2>{'Class Name'}</h2>
              </label>
              <input placeholder="className"></input>
            </div>
            <div className="formSection">
              <label>
                <h3>Date: </h3>
              </label>
              <input placeholder="class date"></input>
            </div>
          </div>

          <div className="Section">
            <label className="name">
              <p className="name">Section: </p>
            </label>
            <input className="name"></input>

            <label>
              <ul passName="song">🎵 </ul>
            </label>
            <input className="song"></input>

            <div className="moves">
              <label>
                <ul>{'move'}</ul>
              </label>
              <input className="move"></input>
            </div>
          </div>
        </form>
        <button className="BigButton" onClick={clickHandler}>
          + Add Section
        </button>
        <div style={{ display: 'flex' }}>
          <button className="BigButtonSave" onClick={() => setIsEdit(!isEdit)}>
            Save
          </button>

          <button
            className="BigButtonCancel"
            onClick={() => setIsEdit(!isEdit)}
          >
            Cancel
          </button>
        </div>
      </div>
      {/* <ClassCreationContainer classes={classes} /> */}
    </div>
  );
}

export default ClassCreation;
