import NavBar from '../components/NavBar';
import ClassCreationContainer from '../components/ClassCreationContainer';
import './ClassCreation.css';
import Selector from '../components/DetailSelector';
import Section from '../components/Section';
import { useState, useEffect } from 'react';
function ClassCreation() {
  const [isEdit, setIsEdit] = useState(false);
  const [classesLength, setClassesLength] = useState();
  const newData = {
    id: classesLength,
    name: '',
    date: '',
    sections: [
      {
        id_1: '',
        name: 'Introduction',
        sequence: [
          {
            song: '',
            moves: [''],
            notes: '',
          },
        ],
      },
    ],
  };

  const [data, setData] = useState(newData);
  const [allMoves, setAllMoves] = useState();

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:8000/moves')
      .then((response) => response.json())
      .then((data) => {
        setAllMoves(data);
        setClassesLength(data.length);
      });
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });
  // };

  // const handleSectionChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const sections = [...data.sections];
  //   sections[index] = { ...sections[index], [name]: value };
  //   setData({ ...data, sections });
  // };

  // const handleSequenceChange = (e, index, index2) => {
  //   const { name, value } = e.target;
  //   const sections = [...data.sections];
  //   sections[index].sequence[index2] = {
  //     ...sections[index].sequence[index2],
  //     [name]: value,
  //   };
  //   setData({ ...data, sections });
  // };

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
  // function clickHandler() {
  //   const newSection = {
  //     id: data.sections.length + 1,
  //     name: '',
  //     sequence: [
  //       {
  //         song: '',
  //         moves: [''],
  //         notes: '',
  //       },
  //     ],
  //   };
  //   const updatedClass1 = {
  //     ...data,
  //     sections: [...data.sections, newSection],
  //   };

  //   setData(updatedClass1);
  // }

  // function addSequence(index, index2) {
  //   let newData = { ...data };
  //   const newSequence = {
  //     song: '',
  //     moves: [''],
  //     notes: '',
  //   };

  //   console.log('section', index, 'sequence', index2);
  //   console.log('pushto', newData.sections[index].sequence[index2]);
  //   newData.sections[index].sequence.push(newSequence);

  //   setData(newData);
  // }

  // function addMove(index, index2) {
  //   let newData = { ...data };
  //   const newSequence = {
  //     song: '',
  //     moves: [''],
  //     notes: '',
  //   };

  //   newData.sections[index].sequence[index2].moves.push('New Move');

  //   setData(newData);
  // }

  // A function to handle the change of the data name
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setData({ ...data, name: newName });
  };

  // A function to handle the change of the data date
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setData({ ...data, date: newDate });
  };

  // A function to handle the addition of a new section
  const handleAddSection = () => {
    const sectionNames = [
      'introduction',
      'warm up',
      'cardio',
      'abs',
      'legs',
      'sun A',
      'sun B',
      'integration',
      'sculpt series',
      'cardio 2',
      'abs 2',
      'legs 2',
    ];

    const newSection = {
      id_1: '',
      name: '',
      sequence: [
        {
          song: '',
          moves: [''],
          notes: '',
        },
      ],
    };
    setData({ ...data, sections: [...data.sections, newSection] });
  };

  // A function to handle the removal of a section by index
  const handleRemoveSection = (index) => {
    if (data.sections.length > 1) {
      const newSections = data.sections.filter((_, i) => i !== index);
      setData({ ...data, sections: newSections });
    }
  };

  // A function to handle the update of a section by index
  const handleUpdateSection = (index, newSection) => {
    const newSections = data.sections.map((sec, i) =>
      i === index ? newSection : sec
    );
    setData({ ...data, sections: newSections });
  };

  return (
    <div className="Page">
      <div className="ClassView">
        {/* <NavBar title="CLASS CREATION" /> */}
        <div className="data">
          <div className="data-header">
            <input
              type="text"
              value={data.name}
              onChange={handleNameChange}
              placeholder="Class name"
            />
            <input
              type="date"
              value={data.date}
              onChange={handleDateChange}
              placeholder="Data date"
            />
          </div>
          <div className="data-body">
            {data.sections.map((sec, i) => (
              <Section
                key={i}
                section={sec}
                updateSection={(newSec) => handleUpdateSection(i, newSec)}
                removeSection={() => handleRemoveSection(i)}
                addSection={handleAddSection}
                sectionsLength={data.sections.length}
              />
            ))}
          </div>
        </div>
        <div className="data-footer">
          <button onClick={handleSubmit} className="button-sm-confirm">
            Submit
          </button>
        </div>

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
