import './OverviewButton.css';
function OverviewButton(props) {
  const inputDate = new Date(props.date);
  const date = `${inputDate.getMonth() + 1}/${inputDate.getDate()}/${
    inputDate.getFullYear() % 100
  }`;
  return (
    <button className="OverviewButton" onClick={props.onClick}>
      <h1>{props.id}</h1>
      <p>{date}</p>
    </button>
  );
}

export default OverviewButton;
