import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import axios from "axios";
// import logo from '../../img/logo.png';
import leaf from '../../img/leaf.png';
import cellsales from '../../img/cellsalesLight.png';
import sake from '../../img/sake.png'
// import '../../App.css';

class Header extends React.Component {  

  render() {
    if (this.props.location.pathname === '/login') return null;
    return (
      <div className="header">
          <div className="logoStrip">
            <div id="darkModeFade"></div>
            <div id="darkModeTint"></div>
            <div id="darkModeTint2"></div>
            <div className="left">
              {/* <img src={logo} id="logoSmall" alt="logo" className="logoSmall"/> */}
              {/* <span className="logoWords">saké</span> */}
              <img alt="sake" src={sake} className="sake" />
              <img alt="leaf" src={leaf} className="leaf" />
              <img src={cellsales} id="cellsales" alt="Cellular Sales" className="cellsales"/>
            </div>
            <div className="right">
              <span id="user">{this.props.user}</span>
              <Link to="/settings" ><span id="settings"></span></Link>
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(Header);
