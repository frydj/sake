import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import logo from '../../img/logo.png';
import cellsales from '../../img/cellsales.png';
import '../../App.css';

function handleSubmit(event) {
    event.preventDefault();
}
/* function validateForm() {
    return username.length > 0 && password.length > 0;
} */

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            session_id: 666,
            username: "",
            loggedIn: false
        };
        // ref
        this.username = React.createRef();
        this.password = React.createRef();
        // bound functions
        this.enter = this.enter.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount = () => {
        /* this.forceUpdate(); */
        document.addEventListener("keypress", this.enter);
        document.addEventListener("keyup", this.shadow);
        document.getElementById("username").focus();
        setTimeout(function () {
            let inputs = document.getElementsByTagName("input");
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].select();
            }
            document.getElementById("username").focus();
        }, 300);
    }

    enter = (e) => {
        if (document.getElementById("signInButton") && window.location.pathname === "/login") {
            if (e.keyCode === 13) {
                document.getElementById("signInButton").className = "loginButton noShadow";
                // document.getElementById("signInButton").click();
                this.submit();
            }
        }
    }

    shadow = (e) => {
        if (document.getElementById("signInButton")) {
            if (e.keyCode === 13) {
                document.getElementById("signInButton").className = "loginButton";
            }
        }
    }

    submit = () => {
        // let path = window.location.href;
        let helper = document.getElementById("helper");
        let url = "/params";
        axios.post(url, {
            session_id: 666,
            user: document.getElementById("username").value,
            password: document.getElementById("password").value,
            logged_in: false,
            customersGridFilter: "something",
            customers_grid_filter: "something"
        },
/*         { params: {
            session_id: this.state.session_id
          }} */).then(response => {
            // refresh the data
            // console.log(document.getElementById("username").value);
            axios.get("/login").then(/* response => this.setState({ customers: response.data }, function() {
              this.showNoData();
              this.setDataPerPage();
              this.hideSpinner();
            }) */
                response => {
                    if (response.data === true) {
                        axios.post(url, {
                            session_id: 666,
                            user: document.getElementById("username").value,
                            password: "********",
                            logged_in: "true",
                            customersGridFilter: "something",
                            customers_grid_filter: "something"
                        })
                        helper.innerHTML = "match found!!! WOO!!";
                        // window.location.pathname = '/customers'
                        // this.props.history.push('/login');
                        this.props.handler(true);
                        this.props.history.push('/customers');
                        // this.props.location.pathname = "/customers"
                    } else {
                        helper.innerHTML = "no match found";
                    }
                    return null;
                });
        });
    }

    render() {
        return (
            <div className="loginOuter">
                <div id="loginContainer" className="loginContainer">
                    <div className="loginInner">
                        <div className="loginTop">
                                <img src={logo} id="logoSmall" alt="logo" className="sakeLogoLogin" />
                                <span className="logoWordsLogin">saké</span>
                                <img src={cellsales} id="cellsales" alt="Cellular Sales" className="cellsalesLogin" />
                        </div>
                        <div className="loginForm">
                            <form onSubmit={handleSubmit}>

                                <div className="field loginField">
                                    <input type="text" name="username" id="username" placeholder="johndoe" />
                                    <label htmlFor="username">Username</label>
                                </div>

                                <div className="field loginField">
                                    <input type="password" name="password" id="password" ref={this.password} placeholder="********" />
                                    <label htmlFor="password">Password</label>
                                </div>

                                <div id="signInButton" className="loginButton" type="submit" onClick={this.submit} >Sign In</div>

                            </form>

                            <div id="helper"></div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);