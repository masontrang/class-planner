import './OverviewButton.css';
function OverviewButton(props) {
  return (
    <button className="OverviewButton" onClick={props.onClick}>
      <h1>{props.id}</h1>
      <p> {props.date}</p>
    </button>
  );
}

export default OverviewButton;
