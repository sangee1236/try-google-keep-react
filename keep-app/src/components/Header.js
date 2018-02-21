import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="header">       
            <nav>
                <div className="nav-wrapper">
                    <Link to='/spendings' className="brand-logo">My List</Link>                    
                    <ul className="right hide-on-med-and-down">
                        <li>
                          <Link to='/dashboard'>Shopping List</Link>
                        </li>
                        <li>
                          <Link to='/spendings'>Visualization</Link>
                        </li> 
                        <li>
                          <Link to='/'>Logout</Link>
                        </li>  
                    </ul>
                </div>
            </nav>
      </div>
    );
  }
}

export default Header;