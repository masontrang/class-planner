import './Section.css';
function Section(props) {
  return (
    <div className="Section">
      <p className="name">Section: {props.section.name}</p>
      <ul passName="song">🎵 {props.section.song1}</ul>
      <p className="moves">
        {props.section.moves1.map((move) => (
          <ul>{move}</ul>
        ))}
      </p>
    </div>
  );
}

export default Section;
