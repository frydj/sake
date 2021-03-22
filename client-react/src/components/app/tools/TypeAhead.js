import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
//import '../../App.css';

class TypeAhead extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                navigation: "standard",
            };
            this.topNav = React.createRef();
        }
        componentDidMount() {
            console.log("foot locker")
        }

        getSearch = () => {
            let inp = document.getElementById(this.props.obj);
            console.log("search for " + inp.value);
            axios.get("/params/666").then(response => {

            })
        }

        render() {
                if (this.props.location.pathname === '/login') return null;
                return ( 
                <div className="typeAheadContainer">
                    <input className="typeAheadDarkTest" id={this.props.obj} onChange={this.getSearch} type="text" />
                </div>
      );
    }
  }

  export default withRouter(TypeAhead);