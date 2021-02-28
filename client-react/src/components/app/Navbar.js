import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../App.css';

class Navbar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      navigation: "standard",
    };
    this.topNav = React.createRef();    
    this.myFunction = this.myFunction.bind(this);
  }
  
  myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
 
  updateDimensions() {
    var x = document.getElementById("myTopnav");
    if(window.innerWidth <= 600 && window.location.pathname !== "/login") {
      x.className = "topnav";
    }
  }
  
  componentDidMount() {
    this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  
  toggleResponsive = (e) => {
    var x = document.getElementById("myTopnav");
    if(x.className === "navbar responsive" || x.className === "navbar responsive backgroundAnimated") {
      x.className = "navbar";
    } else {
      x.className = "navbar responsive";
    }
  }

  closeDropdown = (e) => {
    let dropdownContent = document.getElementsByClassName("dropdown-content");
    let myTopnav = document.getElementById("myTopnav");

    for(var i = 0; i < dropdownContent.length; i++){
      dropdownContent[i].className = "dropdown-content hidden";
    }
    
    myTopnav.className = "topnav"
  }

  setDropdownsClick = (e) => {
    let dropdownContent = document.getElementsByClassName("dropdown-content");

    if(window.innerWidth <= 600) {
      if(e.target.nextSibling.className === "dropdown-content" || e.target.nextSibling.className === "dropdown-content hidden") {
        
        let dropdownContent = document.getElementsByClassName("dropdown-content");        
        for(var v = 0; v < dropdownContent.length; v++){
          dropdownContent[v].className = "dropdown-content";
        }

        e.target.nextSibling.className = "dropdown-content show";
      } else {
        e.target.nextSibling.className = "dropdown-content";      
      }
    } else {
      for(var i = 0; i < dropdownContent.length; i++){
        dropdownContent[i].className = "dropdown-content";
      }
    }
  }

  setDropdowns = (e) => {
    let dropdownContent = document.getElementsByClassName("dropdown-content");

    if(window.innerWidth <= 600) {
    } else {
      for(var i = 0; i < dropdownContent.length; i++){
        dropdownContent[i].className = "dropdown-content";
      }
    }
  }
  
  
  render() {
    if (this.props.location.pathname === '/login') return null;
    return (
      <div className="topnav" id="myTopnav">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className="dropdown">
      <Link to="/quoter">Quoter</Link>
      <Link to="/customers">Customers</Link>
      <Link to="/products">Products</Link>
      </div> 
      <div className="activeCustomer">choose customer...</div>
      <button className="icon" onClick={this.myFunction}>&#9776;</button>
      </div>

      );
    }
  }
  export default withRouter(Navbar);
  