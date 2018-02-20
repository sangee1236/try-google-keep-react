import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">       
            <nav>
                <div className="nav-wrapper">
                    <a href="/" className="brand-logo">Keep It</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/dashboard">Shopping List</a></li>
                        <li><a href="/spendings">Spendings</a></li>   
                    </ul>
                </div>
            </nav>
      </div>
    );
  }
}

export default Header;