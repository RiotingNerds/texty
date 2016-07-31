import React from 'react'
import { Link } from 'react-router';

const Nav = () => {
  return (<nav>
      <div className="nav-wrapper">
        <div className="container">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
          </ul>
        </div>
      </div>
    </nav>   
  )
}

export default Nav