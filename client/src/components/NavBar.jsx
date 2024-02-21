import './NavBar.css';
import { useNavigate, NavLink } from 'react-router-dom';
function NavBar(props) {
  let navigate = useNavigate();
  function clickHandler() {}
  return (
    <div className="NavBar">
      {/* <h1>{props.title}</h1> */}
      <NavLink className="navButton" to="/">
        Home
      </NavLink>
      <NavLink className="navButton" to="overview">
        Overview
      </NavLink>
      <NavLink className="navButton" to="classcreation/new">
        Class Creator
      </NavLink>
      <NavLink className="navButton" to="editor">
        Editor
      </NavLink>
    </div>
  );
}

export default NavBar;
