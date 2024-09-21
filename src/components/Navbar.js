import React from 'react'
import {Link,useLocation} from 'react-router-dom';

function Navbar(props) {
  // useLocation used to get accesss to current location of route
  const location = useLocation();
  const handleLogOut = ()=>{
    props.toggleIsLoggedIn();
    localStorage.removeItem("token")
  }
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      
    <div className="container-fluid">
    <h1 className="navbar-brand mt-1" ><Link className={`nav-link active` } to={`${(props.isLoggedIn === true)?"/notes":"/"}`} >Cloud-Notes</Link></h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${(location.pathname === "/notes")?"active":""} ${(props.isLoggedIn === false)?"d-none":""}` } aria-current="page" to="/notes">Notes</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${(location.pathname === "/about")?"active":""} ` } to="/about">About</Link>
        </li>
      </ul>

      <Link className={`btn btn-success mx-1 my-2 ${(props.isLoggedIn === true)?"d-none":""}`} to="/login" role="button">Log In</Link>
      <Link className={`btn btn-primary mx-1 my-2 ${(props.isLoggedIn === true)?"d-none":""}`} to="/signup" role="button">Sign Up</Link>
      <Link className={`btn btn-danger mx-1 my-2 ${(props.isLoggedIn === false)?"d-none":""}`} to="/" role="button" onClick={handleLogOut}>Log Out</Link>
      
    </div>
    </div>
    </nav>
    
  )
}

export default Navbar