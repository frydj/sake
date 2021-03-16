import React from "react";
import axios from "axios";
// import cellularsales from "../../img/cellsales.png";
// import authretailer from "../../img/authretailer.png";

class Quoter extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { quotes: [],
      dataAvailable: "noData",
      pageTitle: "New Quote",
      deleteQuote: "Jeff",
      quoteID: 9,
      custID: 9,
      mtns: [
        {
          "line" : "1",
          "newupg" : false,
          "owned" : false,
          "buyout" : false,
          "name" : "",
          "device" : "",
          "plan" : "",
          "downpayment" : "",
          "dpp" : "",
          "owed" : "",
          "maxtrade" : "",
          "features" : "",
          "promos" : "",
          "total" : ""
        },
        {
          "line" : "2",
          "newupg" : false,
          "owned" : false,
          "buyout" : false,
          "name" : "",
          "device" : "",
          "plan" : "",
          "downpayment" : "",
          "dpp" : "",
          "owed" : "",
          "maxtrade" : "",
          "features" : "",
          "promos" : "",
          "total" : ""
        },
        {
          "line" : "3",
          "newupg" : false,
          "owned" : false,
          "buyout" : false,
          "name" : "",
          "device" : "",
          "plan" : "",
          "downpayment" : "",
          "dpp" : "",
          "owed" : "",
          "maxtrade" : "",
          "features" : "",
          "promos" : "",
          "total" : ""
        }
      ]
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
    this.validateCustomerName();
    this.validateCustomerPhone();
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
    
    validate = (id, err) => {
      let a = document.getElementById(id);
      let b = document.getElementById(err);
      if(a.value === "") {
        b.className = "errorMessage";
        a.className = "formValidate";
/*         document.getElementsByClassName("formSubHeader")[0].scrollIntoView({behavior: "smooth"});
 */      } else {
        b.className = "errorMessage hidden";
        a.className = "";
      }
    }
    
    render() {
      
      return (
        <div className="component">
        <h3>Quote Builder</h3>
        <div className="quoterContainer">
           
        <div className="printArea">

        <div className="logoBanner">
          <div id="cellularSales" className="logo1"></div>
          <div id="verizon" className="logo2"></div>
        </div>

        <div className="summaryBanner">Summary (DATE)</div>

        <div className="responsiveFormColContainer">
        
        <div className="responsiveFormCol">
        {/* Customer Name */}
        <div className="field">
        <div id="custNameErr" className="errorMessage hidden">Please enter customer's name.</div>
        <input autoFocus onChange={() => this.validate("custName", "custNameErr")} type="text" ref={this.custName} name="custName" id="custName" placeholder="John Doe" />
        <label htmlFor="custName">Customer Name</label>
        </div>
        {/* Customer Phone */}
        <div className="field">
        <div id="custPhoneErr" className="errorMessage hidden">Please enter customer's phone number.</div>
        <input type="text" onChange={() => this.validate("custPhone", "custPhoneErr")} ref={this.custPhone} name="custPhone" id="custPhone" placeholder="(123) 456-7890" />
        <label htmlFor="custPhone">Customer Phone</label>
        </div>
        {/* Customer Email */}
        <div className="field">
        <div id="custEmailErr" className="errorMessage hidden">Please enter customer's email address.</div>
        <input type="text" onChange={() => this.validate("custEmail", "custEmailErr")} ref={this.custEmail} name="custEmail" id="custEmail" placeholder="someone@something.com" />
        <label htmlFor="custEmail">Customer Email</label>
        </div>
        </div>

        <div className="responsiveFormCol">
        {/* Agent Name */}
        <div className="field">
        <div id="agentNameErr" className="errorMessage hidden">Please enter your (agent) name.</div>
        <input onChange={() => this.validate("agentName", "agentNameErr")} type="text" ref={this.agentName} name="agentName" id="agentName" defaultValue={this.props.agent.name} placeholder="Janie Smith" />
        <label htmlFor="agentName">Agent Name</label>
        </div>
        {/* Agent Phone */}
        <div className="field">
        <div id="agentPhoneErr" className="errorMessage hidden">Please enter your (agent) phone number.</div>
        <input onChange={() => this.validate("agentPhone", "agentPhoneErr")} type="text" ref={this.agentPhone} name="agentPhone" id="agentPhone" defaultValue={this.props.agent.phone} placeholder="(123) 456-7890" />
        <label htmlFor="agentPhone">Agent Phone</label>
        </div>
        {/* Agent Email */}
        <div className="field">
        <div id="agentEmailErr" className="errorMessage hidden">Please enter your (agent) email address.</div>
        <input type="text" onChange={() => this.validate("agentEmail", "agentEmailErr")} ref={this.agentEmail} name="agentEmail" id="agentEmail" defaultValue={this.props.agent.email} placeholder="me@cellularsales.com" />
        <label htmlFor="agentEmail">Agent Email</label>
        </div>
        </div>

        </div>

        <div className="monthlyOuter">
        <div className="monthlyInner">
        <h4>Monthly Bill:</h4>
        <div className="quoterTable">

        <table>
          <tbody>
            <tr>
              <th className="colXs">LINE</th>
              <th className="colSq">NEW /<br />UPG.</th>
              <th className="colSq">NO<br />DPP</th>
              <th className="colSq">BUY<br />OUT</th>
              <th className="colMd">NAME</th>
              <th className="colLg">DEVICE</th>
              <th className="colMd">PLAN</th>
              <th className="colSm">DOWN <br />PAYMENT</th>
              <th className="colSm">DPP <br />(MONTHLY)</th>
              <th className="colSm">OWED<br />($)</th>
              <th className="colSm">MAX <br />TRADE</th>
              <th className="colSm">LINE<br />FEATURES</th>
              <th className="colSm">PROMOS <br />($)</th>
            </tr>
            {this.state.mtns.map(p => (
            <tr key={p.line}>
              <td className="noTouch center">{p.line}</td>
              <td className="tableChx center"><input id={p.line + "newupg"} type="checkbox" /></td>
              <td className="tableChx center"><input id={p.line + "owned"} type="checkbox" /></td>
              <td className="tableChx center"><input id={p.line + "buyout"} type="checkbox" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.name} className="tableTxtInput" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.device} className="tableTxtInput" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.plan} className="tableTxtInput" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.downpayment} className="tableCurInput" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.dpp} className="tableCurInput" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.owed} className="tableCurInput" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.maxtrade} className="tableCurInput" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.features} className="tableCurInput" /></td>
              <td className="tableTxt"><input type="text" defaultValue={p.promos} className="tableCurInput" /></td>
            </tr>
              ))
              }
          </tbody>
        </table>

        <table>
          <tbody>
            <tr>
              <th className="totals">Totals</th>
            </tr>
            {this.state.mtns.map(p => (
              <tr key={p.line + "total"}>
                <td className="tdTotals">{p.total}</td>
              </tr>
            ))
            }
          </tbody>
        </table>

        </div>

        <div className="addRow" id="addRow">add row</div>

        </div>
        </div>


        </div>
        
        </div>
        </div>
        );
      }
    }
    
    export default Quoter;
    