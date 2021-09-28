import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./Header.css";
import SearchIcon from "../../Assets/search-solid.svg";
import Logo from "../../Assets/logo.svg";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  return (
    <div className="header-container">
      <div className="logo">
        <img src={Logo} alt="FabMovies-Logo" className="logo-svg" /> FabMovies
      </div>
      <div className="links">
        <ul>
          <li>
            <NavLink
              exact
              className="navlink"
              activeClassName="active"
              to={"/"}
              style={{ textDecoration: "none" }}
            >
              Movies
            </NavLink>
          </li>

          <li>
            <NavLink
              exact
              className="navlink"
              activeClassName="active"
              to={"/shows"}
              style={{ textDecoration: "none" }}
            >
              Tv Shows
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              className="navlink"
              activeClassName="active"
              to={"/wishlist"}
              style={{ textDecoration: "none" }}
            >
              Wishlist
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="right-content">
        <div className="search-bar">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              history.push(`/search/${searchTerm}`);
            }}
          >
            <input
              type="text"
              name="search"
              placeholder="Search..."
              value={searchTerm}
              autoComplete="off"
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <label className="label">
              <input type="submit" className="submit-btn" value=" " />
              <img src={SearchIcon} alt="" className="search-icon" />
            </label>
          </form>
        </div>
        <div className="tmdb-credit">
          <div className="power">Powered by</div>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="tmdb-logo"
            className="tmdb-logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
