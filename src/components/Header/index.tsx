import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../..";

export default function Header({ userToken }: { userToken: boolean }) {
  const token = userToken;
  const user = useSelector((state: RootState) => state.user?.data);

  return token ? (
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            conduit
          </NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact={true}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/editor">
                <i className="ion-compose"></i>&nbsp;New Article
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/settings">
                <i className="ion-gear-a"></i>&nbsp;Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/profile/${user.username}`}>
                <i className="ion-gear-a"></i>&nbsp;
                {user?.username}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  ) : (
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            conduit
          </NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Sign up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
