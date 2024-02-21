import './Section.css';
function Section(props) {
  return (
    <div className="Section">
      <p className="name">Section: {props.section.name}</p>
      {props.section.sequence.map((seq) => (
        <>
          <ul>🎵 {seq.song}</ul>
          {seq.moves.map((move) => (
            <ul>{move}</ul>
          ))}
        </>
      ))}
      {/* <ul passName="song">🎵 {props.section.song1}</ul>
      <p className="moves">
       
      </p> */}
    </div>
  );
}

export default Section;
