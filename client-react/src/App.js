/* React */
import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";

/* Style */
// import "./App.scss";
import "./App.css";

/* Heading */
import Header from "./components/app/Header";
import Navbar from "./components/app/Navbar";

/* Customers */
import NewCustomer from "./components/customers/NewCustomer";
import CustomerGrid from "./components/customers/CustomerGrid";
import EditCustomer from "./components/customers/EditCustomer";

/* Orders */
import NewOrder from "./components/orders/NewOrder";
import NewOrder2 from "./components/orders/NewOrder2";
import OrdersGrid from "./components/orders/OrdersGrid";
import EditOrder from "./components/orders/EditOrder";

/* Quotes */
// import QuoteGrid from "./components/quotes/QuoteGrid";
import Quoter from "./components/quotes/Quoter";
import EditQuote from "./components/quotes/EditQuote";

/* Products */
import NewProduct from "./components/products/NewProduct";
import ProductsGrid from "./components/products/ProductsGrid";
import EditProduct from "./components/products/EditProduct";

/* Reports */
import TotalsPerCustomer from "./components/reports/TotalsPerCustomer";
import TotalsByDate from "./components/reports/TotalsByDate";
import Login from "./components/app/Login";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      session_id: 666,
      username: "",
      password: "",
      loggedIn: "true"
    };
    this.hideSpinner = this.hideSpinner.bind(this);
    // this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this);
  }
  
  handler = (val) => {
    this.setState({
      loggedIn: val
    })
  }

  checkUserLoggedIn = () => {
    // checks to see if the user is logged in
    // redirects to login page if NOT logged in
    // redirects to /customers if IS logged in
    axios.get("/params/" + this.state.session_id).then(response => {
      global.loggedInVar = response.data.logged_in;
      this.setState({username: response.data.user});
      // console.log(global.loggedInVar);
      // console.log("state: " + this.state.loggedIn);
      // console.log("checkUserLoggedIn ran & returned " + global.loggedInVar);
      // console.log(global.loggedInVar);
      this.redirect();
    });
  }
  
  redirect = () => {    
    // console.log("redirect was called");
    let location = "/customers";
    if (global.loggedInVar === "true" && window.location.pathname === "/login" ) {
      window.location.pathname = location;
      // console.log("redirected to CUSTOMERS");
    } else if ( global.loggedInVar !== "true" && window.location.pathname !== "/login" ) {
      window.location.pathname = "/login";
      // this.props.history.push("/login");
      // console.log("redirected to LOGIN");
    }
    this.forceUpdate();
    this.hideSpinner();
  }
  
  componentDidMount() {
    // console.log("app mounted");
    this.checkUserLoggedIn();
    // console.log("login check performed");
    // console.log(this.state.loggedIn);
    document.addEventListener("keypress", this.resetTimer);
    document.addEventListener("mousemove", this.resetTimer);
  }
  
  resetTimer = () => {
    clearTimeout(global.time);
    global.time = setTimeout(() => {
      // this.checkUserLoggedIn();
      axios.get("/params/" + this.state.session_id).then(response => {
        global.loggedInVar2 = response.data.logged_in;
        if(global.loggedInVar2 === "true") {
        this.logOut();
        console.log("reset timer was called as " + global.loggedInVar2);
      } else {
        console.log("reset timer was called as " + global.loggedInVar2);
      }
      })
      // 12 hours
    }, 43200000);
  }

  logOut = () => {
    let url = "/params/666";
    axios.put(url, { 
      //session_id: 666,
      // user: document.getElementById("username").value,
      // password: document.getElementById("password").value,
      logged_in: "false"
  },
/*         { params: {
      session_id: this.state.session_id
    }} */).then(response => {
    console.log("log out was called");
    window.location.pathname = "/login";
  })
  }

  authenticate(){
    return new Promise(resolve => setTimeout(resolve, 200)) // 2 seconds
  }
  
  hideSpinner = () => {
    this.authenticate().then(() => {
      const ele = document.getElementById("spinner");
      const bg = document.getElementById("spinnerBG");
      if(ele){
        // fade out
        ele.classList.add('available');
        bg.classList.add('available')
      }
    })
  }
  
  render() {
    return (
      <div className="App">
      <Router>
      <Header session_id={this.state.session_id} user={this.state.username} /> 
      <Navbar />
      {/* Login */}
      <Route exact path="/login" render={() => <Login handler={this.handler} />} />      
      {/* Customers */}
      <Route path="/newcustomer" render={() => <NewCustomer checkUser={this.checkUserLoggedIn} />} />      
      <Route path="/customers" render={() => <CustomerGrid checkUser={this.checkUserLoggedIn} />} />      
      <Route path="/editcustomer" render={() => <EditCustomer checkUser={this.checkUserLoggedIn} />} />          
      {/* Quotes */}
      <Route path="/quoter" render={() => <Quoter checkUser={this.checkUserLoggedIn} />} />      
      <Route path="/editquote" render={() => <EditQuote checkUser={this.checkUserLoggedIn} />} />      
      {/* Orders */}
      <Route path="/neworder" component={NewOrder} />
      <Route path="/neworder2" component={NewOrder2} />
      <Route path="/orders" component={OrdersGrid} />
      <Route path="/editorder" component={EditOrder} />
      {/* Products */}
      <Route path="/newproduct" render={() => <NewProduct checkUser={this.checkUserLoggedIn} />} />
      <Route path="/products" render={() => <ProductsGrid checkUser={this.checkUserLoggedIn} />} />
      <Route path="/editproduct" component={EditProduct} />
      {/* Reports */}
      <Route path="/reports/totalsbycustomer" render={() => <TotalsPerCustomer checkUser={this.checkUserLoggedIn} />} />
      <Route path="/reports/totalsbydate" render={() => <TotalsByDate checkUser={this.checkUserLoggedIn} />} />

      </Router>
      </div>
      );
    }
  }
  
  export default App;
  