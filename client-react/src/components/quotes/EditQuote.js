import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import $ from 'jquery'; 


class EditQuote extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { quotes: [],
      dataAvailable: "noData",
      pageTitle: "New Quote",
      activeQuote: "",
      quoteFound: "found"
    };
    this.quoteid = React.createRef();
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.email = React.createRef();
    this.phone = React.createRef();
    
    this.address1 = React.createRef();
    this.address2 = React.createRef();
    this.city = React.createRef();
    this.stateName = React.createRef();
    this.zip = React.createRef();
    this.country = React.createRef();
    
    this.mtrate = React.createRef();
    this.mtfrate = React.createRef();
    this.mtbrate = React.createRef();
    this.paymentType = React.createRef();
    this.basis = React.createRef();
    this.day = React.createRef();
    this.phoneField = React.createRef();
    
    this.deleteQuote = this.deleteQuote.bind(this);
    this.updateQuote = this.updateQuote.bind(this);
  }
  
  componentDidMount() {
    //        console.log(currentLocation);
    var currentLocation = window.location.pathname;
    var thisQuote = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);
    this.setState({
      activeQuote: thisQuote
    }, function() {
      this.getData();
    });
    this.autoHighlight();
  }
  
  autoHighlight = () => {
    const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
    const inputDelegate = delegate('input');
    document.getElementById('root').addEventListener('click', inputDelegate((el) => 
    el.target.select()
    ));
  }

  showNoData = () => {
    if(this.state.quotes.length >= 1) {
      this.setState({dataAvailable: "dataIsAvailable"})
    } else {
      this.setState({dataAvailable: "noData"})
    }
  }
  
  getData = () => {
    // eslint-disable-next-line
    let url = "/quote/" + `${this.state.activeQuote}`;
    axios.get(url)
    .then(response => {
      if(response.data === null) {
        this.setState({
          quoteFound: "notFound"
        })
      } else {
        let responseArray = [];
        responseArray.push(response.data);
        this.setState({ 
          quotes: responseArray,
          quoteFound: "found"
        }, function() {
          this.showNoData();
        });
      }
    })
    .catch((err)=>{
      console.log(err);
    });
    //console.log(response);
  };
  
  deleteQuote = (someone) => {
    // eslint-disable-next-line
    let url = "/quote/" + `${someone}`
    axios.delete(url)
    .then(response => {
      this.getData();
    })
  }
  
  testme = () => {
    console.log(this.stateName.current.value);
  }
  
  updateQuote = () => {
    // eslint-disable-next-line
    let url = "/quote/" + `${this.quoteid.current.value}`;
    axios.put(url, { 
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      phone: this.phone.current.value,
      email: this.email.current.value,
      
      address1: this.address1.current.value,
      address2: this.address2.current.value,
      city: this.city.current.value,
      state1: this.stateName.current.value,
      zip: this.zip.current.value,
      country: this.country.current.value,
      
      mtrate: this.mtrate.current.value,
      mtfrate: this.mtfrate.current.value,
      mtbrate: this.mtbrate.current.value,
      paymentType: this.paymentType.current.value,
      basis: this.basis.current.value,
      day: this.day.current.value,
    })
    .then(response => {
      this.props.history.push('/quotes');
    });
  }
  
  validateForm = () => {
    this.validateFirstName();
    this.validateLastName();
    this.validateMowTrim();
    this.validatePaymentType();
    
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let mtrate = document.getElementById("mtrate");
    let paymentType = document.getElementById("paymentType");
    
    if(
      firstName.value === "" ||
      lastName.value === "" ||
      mtrate.value === "" ||
      paymentType.value === ""
      ) {
        // DO NOTHING
      } else {
        this.updateQuote();
      }
    }
    
    validateFirstName = () => {
      let firstName = document.getElementById("firstName");
      let firstNameErr = document.getElementById("firstNameErr");
      if(firstName.value === "") {
        firstNameErr.className = "errorMessage";
        firstName.className = "formValidate";
        document.getElementsByClassName("formSubHeader")[0].scrollIntoView({behavior: "smooth"});
      } else {
        firstNameErr.className = "errorMessage hidden";
        firstName.className = "";
      }
    }
    
    validateLastName = () => {
      let lastName = document.getElementById("lastName");
      let lastNameErr = document.getElementById("lastNameErr");
      if(lastName.value === "") {
        lastNameErr.className = "errorMessage";
        lastName.className = "formValidate";
        document.getElementsByClassName("formSubHeader")[0].scrollIntoView({behavior: "smooth"});
      } else {
        lastNameErr.className = "errorMessage hidden";
        lastName.className = "";
      }
    }
    
    validateMowTrim = () => {
      let mtrate = document.getElementById("mtrate");
      let mtErr = document.getElementById("mtErr");
      if(mtrate.value === "") {
        mtErr.className = "errorMessage";
        mtrate.className = "formValidate";
      } else {
        mtErr.className = "errorMessage hidden";
        mtrate.className = "";
      }
    }
    
    validatePaymentType = () => {
      let paymentType = document.getElementById("paymentType");
      let paymentTypeErr = document.getElementById("paymentTypeErr");
      if(paymentType.value === "") {
        paymentTypeErr.className = "errorMessage";
        paymentType.className = "formValidate";
      } else {
        paymentTypeErr.className = "errorMessage hidden";
        paymentType.className = "";
      }
    }
    
    render() {
      
      return (
        <div className="quote">
        
        <div className={this.state.quoteFound}>Quote Not Found.</div>
        
        {this.state.quotes.map(p => (
          <form key={p.quoteid} action="">
          <h3>Edit Quote (#{p.quoteid})</h3>
          
          <h4 className="formSubHeader">CONTACT INFORMATION:</h4>
          
          <div className="responsiveFormContainer">
          <div className="responsiveForm">
          
          <div className="field hidden">
          <input type="number" ref={this.quoteid} name="quoteid" id="quoteid" placeholder="1" autoComplete="off" defaultValue={p.quoteid}/>
          <label htmlFor="quoteid">Quote ID</label>
          </div>
          
          <div className="field">
          <div id="firstNameErr" className="errorMessage hidden">Please enter first name.</div>
          <input onChange={this.validateFirstName} type="text" ref={this.firstName} name="firstName" id="firstName" placeholder="Jane" defaultValue={p.firstName}/>
          <label htmlFor="firstName">First Name</label>
          </div>
          
          
          <div className="field">
          <div id="lastNameErr" className="errorMessage hidden">Please enter last name.</div>
          <input onChange={this.validateLastName} type="text" ref={this.lastName} name="lastName" id="lastName" placeholder="Appleseed" defaultValue={p.lastName}/>
          <label htmlFor="lastName">Last Name</label>
          </div>
          
          
          </div>
          <div className="responsiveForm">
          
          <div className="field">
          <input type="number" ref={this.phone} name="phone" id="phone" placeholder="(123) 456-7890" defaultValue={p.phone}/>
          <label htmlFor="phone">Phone</label>
          </div>
          
          <div className="field">
          <input type="text" ref={this.email} name="email" id="email" placeholder="jane.appleseed@icloud.com" defaultValue={p.email}/>
          <label htmlFor="email">Email</label>
          </div>
          
          </div>
          </div>
          
          <h4 className="formSubHeader">ADDRESS:</h4>
          
          <div className="responsiveFormContainer">
          <div className="responsiveForm">
          
          <div className="field">
          <input defaultValue={p.address1} type="text" ref={this.address1} name="address1" id="address1" placeholder="4 Privet Dr." />
          <label htmlFor="address1">Address</label>
          </div>
          
          <div className="field">
          <input defaultValue={p.address2} type="text" ref={this.address2} name="address2" id="address2" placeholder="Apt 3A" />
          <label htmlFor="address2">Address 2</label>
          </div>
          
          </div>
          <div className="responsiveForm">
          
          <div className="field">
          <input defaultValue={p.city} type="city" ref={this.city} name="city" id="city" placeholder="Chicago" />
          <label htmlFor="city">City</label>
          </div>         
          
          <div className="field">
          <input defaultValue={p.state1} type="state" ref={this.stateName} name="state" id="state" placeholder="IL" />
          <label htmlFor="state">State</label>
          </div>
          
          </div>
          <div className="responsiveForm">
          
          <div className="field">
          <input defaultValue={p.zip} type="number" ref={this.zip} name="zip" id="zip" placeholder="12345" />
          <label htmlFor="zip">Zip</label>
          </div>
          
          <div className="field">
          <input defaultValue={p.country} type="country" ref={this.country} name="country" id="country" placeholder="United States" />
          <label htmlFor="country">Country</label>
          </div>
          
          </div>
          </div>
          
          <h4 className="formSubHeader">RATES & PAYMENT:</h4>
          
          <div className="responsiveFormContainer">
          <div className="responsiveForm">
          
          <div className="field">
          <div id="mtErr" className="errorMessage hidden">Please enter mow/trim rate.</div>
          <input onChange={this.validateMowTrim} type="number" ref={this.mtrate} name="mtrate" id="mtrate" placeholder="$100.00" defaultValue={p.mtrate}/>
          <label htmlFor="mtrate">Mow/Trim Rate</label>
          </div>
          
          <div className="field">
          <div id="paymentTypeErr" className="errorMessage hidden">Please choose a payment type.</div>
          <select onChange={this.validatePaymentType} ref={this.paymentType} name="paymentType" id="paymentType" defaultValue={p.paymentType}>
          <option value="" disabled>Select...</option>
          <option value="Cash">Cash</option>
          <option value="Credit">Credit</option>
          </select>
          <label htmlFor="paymentType">Payment Type</label>
          </div>
          
          </div>
          <div className="responsiveForm">
          
          <div className="field">
          <input type="number" ref={this.mtfrate} name="mtfrate" id="mtfrate" placeholder="$100.00" defaultValue={p.mtfrate}/>
          <label htmlFor="mtfrate">Front Yard Rate</label>
          </div>
          
          <div className="field">
          <input type="number" ref={this.mtbrate} name="mtbrate" id="mtbrate" placeholder="$100.00" defaultValue={p.mtbrate}/>
          <label htmlFor="mtbrate">Back Yard Rate</label>
          </div>
          
          </div>
          <div className="responsiveForm">
          
          <div className="field">
          <select ref={this.basis} name="basis" id="basis" defaultValue={p.basis}>
          <option value="" disabled>Select...</option>
          <option value="Weekly">Weekly</option>
          <option value="Bi-Weekly">Bi-Weekly</option>
          </select>
          <label htmlFor="basis">Basis</label>
          </div>
          
          <div className="field">
          <select ref={this.day} name="day" id="day" defaultValue={p.day}>
          <option value="" disabled>Select...</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
          </select>
          <label htmlFor="day">Day</label>
          </div>
          
          </div>
          </div>
          
          <button className="responsiveButton" type="button" onClick={this.validateForm}>Update Quote</button>
          
          </form>
          ))}
          
          <div id="success-checkmark" className="success-checkmark hidden">
          <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
          </div>
          </div>
          
          </div>
          );
        }
      }
      
      export default withRouter(EditQuote);
      