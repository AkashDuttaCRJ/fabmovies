import React, { useContext, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import "./Header.css";
import SearchIcon from "../../Assets/search-solid.svg";
import menu from "../../Assets/menu-solid.svg";
import Logo from "../../Assets/logo.svg";
import { WishlistContext } from "../../WishlistContext";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const {menuOpen, setMenuOpen} = useContext(WishlistContext);

  return (
    <div className="header-container">
      <div className="logo">
        <img src={Logo} alt="FabMovies-Logo" className="logo-svg" />
        <span>F</span>
        <span>a</span>
        <span>b</span>
        <span>M</span>
        <span>o</span>
        <span>v</span>
        <span>i</span>
        <span>e</span>
        <span>s</span>
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
              to={"/tv"}
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
              searchTerm && history.push(`/search/${searchTerm}`);
            }}
            noValidate
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
        <a target="_blank" rel="noreferrer" href="https://www.themoviedb.org/">
        <div className="tmdb-credit">
          <div className="power">Powered by</div>
            <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="tmdb-logo"
            className="tmdb-logo"
          />  
        </div>
        </a>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <img src={menu} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Header;
