import './Overview.css';
import NavBar from '../components/NavBar';
import OverviewContainer from '../components/OverviewContainer';
import data from '../data.json';
function Overview() {
  return (
    <div className="Page">
      {/* <NavBar title="OVERVIEW" /> */}

      <OverviewContainer classes={data.classes} />
    </div>
  );
}

export default Overview;
