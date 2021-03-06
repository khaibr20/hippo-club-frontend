/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
import { NavLink, Link } from "react-router-dom"
import { removeUserSession } from "../../Utils/Common"

import logo from "./logo.svg"
import "./nav.css"

const Nav = () => {
  const logout = () => {
    removeUserSession()
    window.location.reload()
  }

  return (
    <div className="nav">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      {/* NavLink */}
      <div className="linkList">
        <NavLink className="listItem" activeClassName="active" to="/" exact>
          Home
        </NavLink>
        <NavLink className="listItem" activeClassName="active" to="/upload">
          Upload
        </NavLink>
        <NavLink className="listItem" activeClassName="active" to="/profile">
          Profile
        </NavLink>
      </div>
      <div className="logout">
        <button onClick={logout}>Logout</button>
        {/* <img src="https://source.unsplash.com/user/erondu/40x40" alt="" /> */}
        {/* {open && (
          <div className="dropdown-wrapper">
            <ul className="dropdown-menu">
              <li className="dropdown-menu__item">
                <Link>Edit</Link>
              </li>
              <li className="dropdown-menu__item">
                <Link className="dropdown-menu__item__link">
                  Deactivate account
                </Link>
              </li>
            </ul>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Nav
