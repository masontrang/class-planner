import './OverviewButton.css';
function OverviewButton(props) {
  const inputDate = new Date(props.date);
  const date = `${inputDate.getMonth() + 1}/${inputDate.getDate()}/${
    inputDate.getFullYear() % 100
  }`;
  return (
    <button className="OverviewButton" onClick={props.onClick}>
      <p className="button-label">{props.name ? props.name : 'Class '}</p>
      <p className="button-date">{date}</p>
    </button>
  );
}

export default OverviewButton;
