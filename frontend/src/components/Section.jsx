import './Section.css';
import Sequence from './Sequence';
import { useState, useEffect } from 'react';
function Section({
  sectionsLength,
  section,
  updateSection,
  removeSection,
  addSection,
}) {
  const [sectionTypes, setSectionTypes] = useState();

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8000/sections')
      .then((response) => response.json())
      .then((data) => {
        setSectionTypes(data);
      });
  }, []);

  // A function to handle the change of the section name
  const handleNameChange = (e) => {
    const newName = e.target.value;
    updateSection({ ...section, name: newName });
  };

  // A function to handle the addition of a new sequence
  const handleAddSequence = () => {
    const newSequence = {
      song: '',
      moves: [''],
      notes: '',
    };
    updateSection({
      ...section,
      sequence: [...section.sequence, newSequence],
    });
  };

  // A function to handle the removal of a sequence by index
  const handleRemoveSequence = (index) => {
    const newSequence = section.sequence.filter((_, i) => i !== index);
    updateSection({ ...section, sequence: newSequence });
  };

  // A function to handle the update of a sequence by index
  const handleUpdateSequence = (index, newSequence) => {
    const newSequences = section.sequence.map((seq, i) =>
      i === index ? newSequence : seq
    );
    updateSection({ ...section, sequence: newSequences });
  };

  const colors = {
    introduction: '#FFC4C4',
    warm_up: '#FFF4C4',
    cardio: '#C4FFC4',
    abs: '#C4FFFF',
    legs: '#C4C4FF',
    sun_a: '#F4C4FF',
    sun_b: '#FFC4F4',
    integration: '#FFC4A4',
    sculpt_series: '#A4FFC4',
    cardio_2: '#C4A4FF',
    abs_2: '#A4C4FF',
    legs_2: '#FFA4C4',
  };

  return (
    <div
      className="section"
      style={{
        backgroundColor: `${
          colors[section.name.replace(' ', '_').toLowerCase()]
        }`,
      }}
    >
      {/* {section.name} */}
      <div className="section-header">
        {/* <input
          type="text"
          value={section.name}
          onChange={handleNameChange}
          placeholder="Section name"
        /> */}
        {/* <label>Section Name</label> */}
        <select
          id="sectionType"
          name="sectionType"
          value={section.name}
          onChange={handleNameChange}
        >
          {sectionTypes &&
            sectionTypes.map((sectionType) => (
              <option value={sectionType.name}>{sectionType.name}</option>
            ))}
        </select>
        <div className="buttonContainer">
          {sectionsLength > 1 && (
            <button onClick={removeSection} className="button-sm">
              {/* Remove Section */} -
            </button>
          )}
          <button onClick={addSection} className="button-sm-confirm">
            {/* Add Section */} +
          </button>
        </div>
      </div>
      <div className="section-body">
        {section.sequence.map((seq, i) => (
          <Sequence
            key={i}
            sequence={seq}
            updateSequence={(newSeq) => handleUpdateSequence(i, newSeq)}
            removeSequence={() => handleRemoveSequence(i)}
            handleAddSequence={handleAddSequence}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
