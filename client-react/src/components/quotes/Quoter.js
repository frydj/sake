import React from "react";
import axios from "axios";

class Quoter extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { quotes: [],
      dataAvailable: "noData",
      pageTitle: "New Quote",
      deleteQuote: "Jeff"
    };
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.email = React.createRef();
    this.phone = React.createRef();
    this.mtrate = React.createRef();
    this.mtfrate = React.createRef();
    this.mtbrate = React.createRef();
    this.paymentType = React.createRef();
    this.basis = React.createRef();
    this.day = React.createRef();
    this.phoneField = React.createRef();
    
    this.address1 = React.createRef();
    this.address2 = React.createRef();
    this.city = React.createRef();
    this.stateName = React.createRef();
    this.zip = React.createRef();
    this.country = React.createRef();
    
    this.validateForm = this.validateForm.bind(this);
  }
  
  addQuote = () => {
    let url = "/quote";
    axios.post(url, { 
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      email: this.email.current.value,
      phone: this.phone.current.value,
      
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
    }).then(response => {
      // refresh the data
      this.props.history.push('/quotes');
    });
  };

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
        this.addQuote();
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
        <div className="customer">
        <h3>Quote Builder</h3>
        
        <form action="">
        
        <h4 className="formSubHeader">CONTACT INFORMATION:</h4>
        
        <div className="responsiveFormContainer">
        <div className="responsiveForm">
        
        <div className="field">
        <div id="firstNameErr" className="errorMessage hidden">Please enter first name.</div>
        <input autoFocus onChange={this.validateFirstName} type="text" ref={this.firstName} name="firstName" id="firstName" placeholder="Jane" />
        <label htmlFor="firstName">First Name</label>
        </div>
        
        
        <div className="field">
        <div id="lastNameErr" className="errorMessage hidden">Please enter last name.</div>
        <input onChange={this.validateLastName} type="text" ref={this.lastName} name="lastName" id="lastName" placeholder="Appleseed" />
        <label htmlFor="lastName">Last Name</label>
        </div>
        
        
        </div>        
        <div className="responsiveForm">
        
        
        <div className="field">
        <input type="number" ref={this.phone} name="phone" id="phone" placeholder="(123) 456-7890" />
        <label htmlFor="phone">Phone</label>
        </div>
        
        <div className="field">
        <input type="text" ref={this.email} name="email" id="email" placeholder="jane.appleseed@icloud.com" />
        <label htmlFor="email">Email</label>
        </div>
        
        </div>
        </div>
        
        
        
        <h4 className="formSubHeader">ADDRESS:</h4>
        
        <div className="responsiveFormContainer">
        <div className="responsiveForm">
        
        <div className="field">
        <input type="text" ref={this.address1} name="address1" id="address1" placeholder="4 Privet Dr." />
        <label htmlFor="address1">Address</label>
        </div>
        
        <div className="field">
        <input type="text" ref={this.address2} name="address2" id="address2" placeholder="Apt 3A" />
        <label htmlFor="address2">Address 2</label>
        </div>
        
        </div>
        <div className="responsiveForm">
        
        <div className="field">
        <input type="city" ref={this.city} name="city" id="city" placeholder="Chicago" />
        <label htmlFor="city">City</label>
        </div>       
        
        <div className="field">
        <input type="state" ref={this.stateName} name="state" id="state" placeholder="IL" />
        <label htmlFor="state">State</label>
        </div>
        
        </div>
        <div className="responsiveForm">

        <div className="field">
        <input type="number" ref={this.zip} name="zip" id="zip" placeholder="12345" />
        <label htmlFor="zip">Zip</label>
        </div>
        
        <div className="field">
        <input defaultValue="United States" type="country" ref={this.country} name="country" id="country" placeholder="United States" />
        <label htmlFor="country">Country</label>
        </div>
        
        </div>
        </div>
        
        <h4 className="formSubHeader">RATES & PAYMENT:</h4>
        
        <div className="responsiveFormContainer">
        
        <div className="responsiveForm">
        
        <div className="field">
        <div id="mtErr" className="errorMessage hidden">Please enter mow/trim rate.</div>
        <input onChange={this.validateMowTrim} type="number" ref={this.mtrate} name="mtrate" id="mtrate" placeholder="$100.00" />
        <label htmlFor="mtrate">Mow/Trim Rate</label>
        </div>
        
        
        <div className="field">
        <div id="paymentTypeErr" className="errorMessage hidden">Please choose a payment type.</div>
        <select onChange={this.validatePaymentType} defaultValue="" ref={this.paymentType} name="paymentType" id="paymentType" >
        <option value="" disabled>Select...</option>
        <option value="Cash">Cash</option>
        <option value="Credit">Credit</option>
        </select>
        <label htmlFor="paymentType">Payment Type</label>

        </div>
        
        </div>
        <div className="responsiveForm">

        <div className="field">
        <input type="number" ref={this.mtfrate} name="mtfrate" id="mtfrate" placeholder="$100.00" />
        <label htmlFor="mtfrate">Front Yard Rate</label>
        </div>
        
        <div className="field">
        <input type="number" ref={this.mtbrate} name="mtbrate" id="mtbrate" placeholder="$100.00" />
        <label htmlFor="mtbrate">Back Yard Rate</label>
        </div>
        
        </div>
        <div className="responsiveForm">
                
        <div className="field">
        <select defaultValue="" ref={this.basis} name="basis" id="basis" >
        <option value="" disabled>Select...</option>
        <option value="Weekly">Weekly</option>
        <option value="Bi-Weekly">Bi-Weekly</option>
        </select>
        <label htmlFor="basis">Basis</label>
        </div>
        
        <div className="field">
        <select defaultValue="" ref={this.day} name="day" id="day" >
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
        
        <button className="responsiveButton newSave" type="button" onClick={this.validateForm}>Save Quote</button>
        
        </form>
        
        </div>
        
        
        
        );
      }
    }
    
    export default Quoter;
    