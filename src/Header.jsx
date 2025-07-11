import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import "./Header.css";

export function Header({ isLoggedIn, setIsLoggedIn }) {
  return (
    <header className="app-header bg-beige shadow-sm">
      <nav className="container d-flex justify-content-between align-items-center py-3">
        <h4 className="app-title m-0">Noti.</h4>
        <div className="nav-links">
          {isLoggedIn ? (
            <>
              <Link to="/notes" className="btn btn-link green-link me-3">
                My Notes
              </Link>
              <LogoutLink setIsLoggedIn={setIsLoggedIn} className="btn btn-link green-link" />
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-link green-link me-3">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-link green-link">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
