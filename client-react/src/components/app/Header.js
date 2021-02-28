import React from 'react';
import { withRouter } from 'react-router-dom';
// import axios from "axios";
import logo from '../../img/logo.png';
import cellsales from '../../img/cellsales.png';
import '../../App.css';

class Header extends React.Component {  

  render() {
    if (this.props.location.pathname === '/login') return null;
    return (
      <div className="header">
          <div className="logoStrip">
              <img src={logo} id="logoSmall" alt="logo" className="logoSmall"/>
              <span className="logoWords">saké</span>
              <img src={cellsales} id="cellsales" alt="Cellular Sales" className="cellsales"/>
              <span id="user">{this.props.user}</span>
          </div>
      </div>
    );
  }
}

export default withRouter(Header);
