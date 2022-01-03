import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import SearchIcon from "../../Assets/search-solid.svg";
import CrossIcon from "../../Assets/times-solid.svg";
import { WishlistContext } from '../../WishlistContext';
import "./Menu.css";

const Menu = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();

    const {menuOpen, setMenuOpen} = useContext(WishlistContext);

    return (
        <div className="menu-layer">
            <div className="menu-section">
                <button className="menu menu-cross" onClick={() => setMenuOpen(!menuOpen)}>
                    <img src={CrossIcon} alt="" />
                </button>
                <div className="links menu-links">
                    <ul>
                        <li onClick={() => setMenuOpen(!menuOpen)}>
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
                        <li onClick={() => setMenuOpen(!menuOpen)}>
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
                        <li onClick={() => setMenuOpen(!menuOpen)}>
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
                <div className="search-bar menu-search-bar">
                    <form
                    className="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        searchTerm && history.push(`/search/${searchTerm}`);
                        setMenuOpen(!menuOpen);
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
            </div>
        </div>
    )
}

export default Menu
