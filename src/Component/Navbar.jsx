import React from 'react'
import { Link } from 'react-router-dom' 
import useAuth from "../hooks/useAuth"
function Navbar() {
  const {isLoggedIn} = useAuth()
  return (
    <>
     <nav className="navbar navbar-expand-lg bg-opacity-10 container" style={{borderRadius: "5rem"}}>
  <div className="container-fluid">
  <Link className="navbar-brand text-light" to={isLoggedIn ? "/logout":"/logout"}>{isLoggedIn ? "Dashboard":"Login"}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-light btn btn-outline-dark rounded-pill" aria-current="page" to="dashboard">Dashboard</Link>
        </li>
      </ul>
      <form className="d-flex">
        <Link className="btn btn-outline-warning" type="submit" to={isLoggedIn ? "/logout":"/logout"} >{isLoggedIn ? "Logout": "Login"}</Link>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar