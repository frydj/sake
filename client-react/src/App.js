/* React */
import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";

/* Style */
import "./App.scss";
import "./light.css";
import { DarkTheme } from './components/app/tools/DarkTheme.js';

/* Heading */
import Header from "./components/app/Header";
import Navbar from "./components/app/Navbar";
import Settings from "./components/app/Settings";

/* Customers */
import NewCustomer from "./components/customers/NewCustomer";
import CustomerGrid from "./components/customers/CustomerGrid";
import EditCustomer from "./components/customers/EditCustomer";

/* Orders */
import NewOrder from "./components/orders/NewOrder";
import NewOrder2 from "./components/orders/NewOrder2";
// import OrdersGrid from "./components/orders/OrdersGrid";
import EditOrder from "./components/orders/EditOrder";

/* Quotes */
// import QuoteGrid from "./components/quotes/QuoteGrid";
import Quoter from "./components/quotes/Quoter";
import EditQuote from "./components/quotes/EditQuote";

/* Products */
import NewProduct from "./components/products/NewProduct";
// import ProductsGrid from "./components/products/ProductsGrid";
import EditProduct from "./components/products/EditProduct";

/* Reports */
import TotalsPerCustomer from "./components/reports/TotalsPerCustomer";
import TotalsByDate from "./components/reports/TotalsByDate";
import Login from "./components/app/Login";

/* Literature */
import Intergroup from "./components/literature/Intergroup";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      session_id: 666,
      username: "",
      password: "",
      userID: 9,
      userSettings: [],
      styles: null,
      loggedIn: "true",
      theme: '',
      darkEnabled: false,
      agent: {
        name: "Derek Fry",
        phone: "(336) 406-3385",
        email: "derek.fry2@cellularsales.com"
      }
    };
    this.hideSpinner = this.hideSpinner.bind(this);
    // this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this);
  }

  componentDidMount() {
    this.checkUserLoggedIn();
    this.getUserSettings();
    document.addEventListener("keypress", this.resetTimer);
    document.addEventListener("mousemove", this.resetTimer);
/*     setTimeout(() => {
      this.setThemeOK();
    },200) */
  }

  setThemeOK = () => {
    if(this.state.userSettings["theme"] === "light") {
      global.darkEnabled = false;
    } else {
      global.darkEnabled = true;
    }
  }

  handler = (val) => {
    this.setState({
      loggedIn: val
    })
  }

  checkUserLoggedIn = () => {
    axios.get("/params/" + this.state.session_id).then(response => {
      global.loggedInVar = response.data.logged_in;
      this.setState({ username: response.data.user },function() {
        this.redirect();
      });
    });
  }

  redirect = () => {
    let location = "/customers";
    if (global.loggedInVar === "true" && window.location.pathname === "/login") {
      window.location.pathname = location;
    } else if (global.loggedInVar !== "true" && window.location.pathname !== "/login") {
      window.location.pathname = "/login";
    }
    this.forceUpdate();
    this.hideSpinner();
  }

  themeToggler = () => {
    axios.get("/usersetting/9").then(
      response => (global.theme = response.data.theme)
    ).then(
      setTimeout(() => {
        global.theme === 'light' ? global.themeToggled = 'dark' : global.themeToggled = 'light';
        // UPDATE DB & THEME HERE
        axios.put("/usersetting/9", {
          theme: global.themeToggled
        });
        setTimeout(() => {
          if (this.state.userSettings["theme"] === 'dark') {
            this.setState({
              darkEnabled: true
            }, function() {
              // this.setThemeOK();
              this.getUserSettings();
            })
          } else {
            this.setState({
              darkEnabled: false
            }, function() {
              // this.setThemeOK();
              this.getUserSettings();
            })
          }
        },200)
        // TOGGLE GLOBAL VARIABLE
        global.theme === 'light' ? global.theme = 'dark' : global.theme = 'light';
      }, 200)
    );
          
  }

  getUserSettings = () => {
    let url = "/usersetting/9";
    axios.get(url).then(response => {
      this.setState({
        userSettings: response.data,
        darkEnabled: response.data["theme"] === 'dark' ? true : false
      }/*,function() {
        setTimeout(() => {
          if (this.state.userSettings["theme"] === 'dark') {
            this.setState({
              darkEnabled: true
            })
          } else {
            this.setState({
              darkEnabled: false
            })
          }
        },10)
      }*/,function() {
      })
    });
  }

  resetTimer = () => {
    clearTimeout(global.time);
    global.time = setTimeout(() => {
      axios.get("/params/" + this.state.session_id).then(response => {
        global.loggedInVar2 = response.data.logged_in;
        if (global.loggedInVar2 === "true") {
          this.logOut();
        }
      })
      // 12 hours
    }, 43200000);
  }

  logOut = () => {
    let url = "/params/666";
    axios.put(url, {
      logged_in: "false"
    },).then(response => {
      window.location.pathname = "/login";
    })
  }

  authenticate() {
    return new Promise(resolve => setTimeout(resolve, 200)) // 2 seconds
  }

  hideSpinner = () => {
    this.authenticate().then(() => {
      const ele = document.getElementById("spinner");
      const bg = document.getElementById("spinnerBG");
      if (ele) {
        // fade out
        ele.classList.add('available');
        bg.classList.add('available')
      }
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.userSettings['theme'] === 'dark' ? <DarkTheme /> : null}
        <Router>
          <Header session_id={this.state.session_id} user={this.state.username} />
          <Navbar />
          <Route path="/settings" render={() => <Settings checkUser={this.checkUserLoggedIn} themeToggler={this.themeToggler} getUserSettings={this.getUserSettings} darkEnabled={this.state.darkEnabled} />} />
          {/* Login */}
          <Route exact path="/login" render={() => <Login handler={this.handler} />} />
          {/* Customers */}
          <Route path="/newcustomer" render={() => <NewCustomer checkUser={this.checkUserLoggedIn} />} />
          <Route path="/customers" render={() => <CustomerGrid checkUser={this.checkUserLoggedIn} />} />
          <Route path="/editcustomer" render={() => <EditCustomer checkUser={this.checkUserLoggedIn} />} />
          {/* Quotes */}
          <Route path="/quoter" render={() => <Quoter agent={this.state.agent} checkUser={this.checkUserLoggedIn} />} />
          <Route path="/editquote" render={() => <EditQuote checkUser={this.checkUserLoggedIn} />} />
          {/* Orders */}
          <Route path="/neworder" component={NewOrder} />
          <Route path="/neworder2" component={NewOrder2} />
          {/* <Route path="/orders" component={OrdersGrid} /> */}
          <Route path="/editorder" component={EditOrder} />
          {/* Products */}
          <Route path="/newproduct" render={() => <NewProduct checkUser={this.checkUserLoggedIn} />} />
          {/* <Route path="/products" render={() => <ProductsGrid checkUser={this.checkUserLoggedIn} />} /> */}
          <Route path="/editproduct" component={EditProduct} />
          {/* Reports */}
          <Route path="/reports/totalsbycustomer" render={() => <TotalsPerCustomer checkUser={this.checkUserLoggedIn} />} />
          <Route path="/reports/totalsbydate" render={() => <TotalsByDate checkUser={this.checkUserLoggedIn} />} />
          {/* LITERATURE */}
          <Route path="/aaliterature" render={() => <Intergroup checkUser={this.checkUserLoggedIn} />} />
        </Router>
      </div>
    );
  }
}

export default App;
