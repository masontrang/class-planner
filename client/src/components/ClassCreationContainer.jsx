import './ClassCreationContainer.css';
import OverviewButton from './OverviewButton';
import data from '../data.json';
import { useState } from 'react';
function ClassCreationContainer(props) {
  const [class1, setClass1] = useState(data.classes[0]);
  return (
    <div className="ClassCreationContainer">
      {/* {class1.sections.map((section) => (
        <div className="Section">
          <form>
            <label className="name">Section:</label>
            <input className="name"></input>

            <label>🎵</label>
            <input className="song"></input>

            {section.moves1.map((move) => (
              <div className="moves">
                <label>Move</label>
                <input className="move"></input>
              </div>
            ))}
          </form>
        </div>
      ))} */}
    </div>
  );
}

export default ClassCreationContainer;
