import React from "react";
import axios from "axios";
import $ from 'jquery'; 

class NewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders: [],
            query: [],
            searchResults: "hidden",
            dataAvailable: "noData",
            downCount: -1
        };
        this.newOrder = React.createRef();
        this.orderid = React.createRef();
        this.customerid = React.createRef();
        this.serviceDate = React.createRef();
        this.service = React.createRef();
        this.cu = React.createRef();
        this.pw = React.createRef();
        this.r = React.createRef();
        this.lr = React.createRef();
        this.misc = React.createRef();
        this.notes = React.createRef();
        
        // search
        this.returnedQuery = React.createRef();       
        this.searchResults = React.createRef();       
        this.searchResult = React.createRef();       
        this.searchInput = React.createRef();
        
        // bound functions
        this.enter = this.enter.bind(this);
        this.selectContents = this.selectContents.bind(this);
        this.checkKey = this.checkKey.bind(this);
    }
    
    componentDidMount() {
        this.getSearchData();
    }
    
    getInitialState(){
        return {searchResults:"hidden"};
    };
    
    hideResults = () => {
        this.setState({"searchResults":"hidden"});
    }
    
    showResults = () => {
        this.setState({"searchResults":"show"});
    }
    
    selectContents = (e) => {
        e.target.select();
    }
    
    searchThis = () => {
        this.validateCustomer();
        if(this.searchInput.current.value === '') {
            this.hideResults();
            this.customerid.current.value = '';
            this.validateCustomer();
        } else {
            this.showResults();
            let url = "/customersearchinput";
            axios.post(url, { 
                search: this.searchInput.current.value,            
            }).then(response => {
                this.getSearchData();
            });
            this.validateCustomer();
            this.customerid.current.value = '';
        }
    };
    
    searchResultsResetClasses = () => {
        for(var i = 0; i < document.getElementById("searchResults").childNodes.length; i++) {
            document.getElementById("searchResults").childNodes[i].className = "customerSearchResult";           
        }
    }
    
    checkKey = (e) => {
        $('input').bind('keydown', function(e){
            if(e.keyCode === 38 || e.keyCode === 40){
                e.preventDefault();
            }
        });
        var limitHigh = document.getElementById("searchResults").childElementCount;
        var limitLow = 0;
        var myCount = this.state.downCount;
        if(myCount < limitLow) {
            myCount = -1;
        } 
        if(myCount >= limitHigh) {
            myCount = limitHigh;
        } 
        // 65-90 are a-z ;; space is 32 ;; 48-57 are numbers ;;  189 is hypen
        if(myCount <= limitHigh - 1 && myCount >= limitLow && limitHigh > 0) {
            document.getElementById("searchResults").childNodes[myCount].className = "customerSearchResultActive";           
        }
        if (e.keyCode === 40) {
            // down arrow
            myCount = myCount + 1;
            if(myCount <= limitLow) {
                myCount = 0;
            } 
            if(myCount >= limitHigh - 1) {
                myCount = limitHigh - 1;
            } 
            if(myCount > limitLow) {
                document.getElementById("searchResults").childNodes[myCount - 1].className = "customerSearchResult";           
            }
            if(myCount < limitHigh - 1) {
                document.getElementById("searchResults").childNodes[myCount + 1].className = "customerSearchResult";           
            }
            if(myCount <= limitHigh && myCount >= limitLow && limitHigh > 0) {
                document.getElementById("searchResults").childNodes[myCount].className = "customerSearchResultActive";           
            }       
            this.setState({
                downCount: myCount
            })
        } else if (e.keyCode === 38) {
            // up arrow
            myCount = myCount - 1;
            if(myCount <= limitLow) {
                myCount = 0;
            } 
            if(myCount >= limitHigh) {
                myCount = limitHigh;
            } 
            if(myCount !== limitLow) {
                document.getElementById("searchResults").childNodes[myCount - 1].className = "customerSearchResult";           
            }
            if(myCount < limitHigh - 1) {
                document.getElementById("searchResults").childNodes[myCount + 1].className = "customerSearchResult";           
            }
            if(myCount <= limitHigh && myCount >= limitLow && limitHigh > 0) {
                document.getElementById("searchResults").childNodes[myCount].className = "customerSearchResultActive";           
            }
            this.setState({
                downCount: myCount
            })       
        } else if (e.keyCode === 13) {
            // enter
            if(myCount < limitLow) {
                myCount = 0;
            } 
            if(myCount >= limitHigh) {
                myCount = limitHigh - 1;
            } 
            document.getElementById("searchResults").childNodes[myCount].click();           
        }
    }
    
    getSearchData = () => {
        let url = "/customersearch";
        axios.get(url).then(response => this.setState({ query: response.data }));
    };
    
    enter = (e) => {
        this.searchInput.current.value = e.target.innerHTML;
        this.customerid.current.value = e.target.id;
        this.validateCustomer();
        this.hideResults();
    };
    
    addOrder = () => {
        let url = "/order";
        axios.post(url, { 
            customerid: this.customerid.current.value,
            serviceDate: this.serviceDate.current.value,
            service: this.service.current.value,
            cu: this.cu.current.value,
            pw: this.pw.current.value,
            r: this.r.current.value,
            lr: this.lr.current.value,
            misc: this.misc.current.value,
            notes: this.notes.current.value,     
        }).then(response => {            
            this.props.history.push('/orders');
        });
    };
    
    validateForm = () => {
        this.validateCustomer();
        this.validateServiceDate();
        this.validateService();
        let customerid = document.getElementById("customerid");
        let serviceDate = document.getElementById("serviceDate");
        let service = document.getElementById("service");
        if(
            customerid.value === "" ||
            serviceDate.value === "" ||
            service.value === ""
            ) {} else {
                this.addOrder();
            }            
        }
        
        validateCustomer = () => {
            let customerid = document.getElementById("customerid");
            let searchInput = document.getElementById("searchInput");
            let customeridErr = document.getElementById("customerErr");
            if(customerid.value === "") {
                customeridErr.className = "errorMessage";
                searchInput.className = "formValidate";
            } else {
                customeridErr.className = "errorMessage hidden";
                searchInput.className = "";
            }
        }
        
        validateServiceDate = () => {
            let serviceDate = document.getElementById("serviceDate");
            let serviceDateErr = document.getElementById("serviceDateErr");
            if(serviceDate.value === "") {
                serviceDateErr.className = "errorMessage";
                serviceDate.className = "formValidate";
            } else {
                serviceDateErr.className = "errorMessage hidden";
                serviceDate.className = "";
            }
        }
        
        validateService = () => {
            let service = document.getElementById("service");
            let serviceErr = document.getElementById("serviceErr");
            if(service.value === "") {
                serviceErr.className = "errorMessage";
                service.className = "formValidate";
            } else {
                serviceErr.className = "errorMessage hidden";
                service.className = "";
            }
        }
        
        render() {
            return (
                <div ref={this.newOrder} className="customer">
                <h3>New Order</h3>
                
                <form action="">
                
                <h4 className="formSubHeader">APPOINTMENT:</h4>
                
                <div className="responsiveFormContainer">
                <div className="responsiveForm">
                
                <div className="field">
                <div id="customerErr" className="errorMessage hidden">Please choose a valid customer.</div>
                <input autoFocus onKeyDown={this.checkKey} onChange={this.searchThis} onFocus={this.selectContents} type="text" ref={this.searchInput} name="searchInput" id="searchInput" placeholder="Type to Search..." autoComplete="off" />
                <label htmlFor="searchInput">Customer</label>
                
                <div ref={this.searchResults} className={this.state.searchResults}>
                <div onMouseOver={this.searchResultsResetClasses} id="searchResults" className="searchResults">
                {this.state.query.map(
                    p => (
                        <div ref={this.searchResult} className="customerSearchResult" key={p.customerid} id={p.customerid} onClick={this.enter} >{p.returnedQuery}
                        </div>
                        ))
                    }
                    </div>
                    </div>
                    
                    </div>
                    
                    <div className="field hidden">
                    <input type="number" ref={this.customerid} name="customerid" id="customerid" placeholder="1" autoComplete="off" />
                    <label htmlFor="customerid">Customer ID</label>
                    </div>                  
                    
                    <div className="field">
                    <div id="serviceDateErr" className="errorMessage hidden">Please choose a service date.</div>
                    <input onChange={this.validateServiceDate} type="date" ref={this.serviceDate} name="serviceDate" id="serviceDate" />
                    <label htmlFor="serviceDate">Service Date</label>
                    </div>
                    
                    </div>
                    </div>
                    
                    <h4 className="formSubHeader">SERVICES RENDERED:</h4>
                    
                    <div className="servicesOuterContainer">
                    <div className="servicesContainer">


                    <div className="field">
                    <input type="text" ref={this.productSearch} name="productSearch" id="productSearch" placeholder="Mow" />
                    <label htmlFor="productSearch">Search...</label>
                    </div>

                    </div>
                    </div>

                    <div className="responsiveFormContainer">
                    <div className="responsiveForm">
                    
                    <div className="field">
                    <div id="serviceErr" className="errorMessage hidden">Please select a service.</div>
                    <select onChange={this.validateService} defaultValue="" ref={this.service} name="service" id="service" >
                    <option value="" disabled>Select...</option>
                    <option value="MT">Mow/Trim</option>
                    <option value="MTF">Mow/Trim (Front Yard)</option>
                    <option value="MTB">Mow/Trim (Back Yard)</option>
                    </select>
                    <label htmlFor="service">Service</label>
                    </div>
                    
                    
                    <div className="field">
                    <input type="number" ref={this.cu} name="cu" id="cu" placeholder="00" />
                    <label htmlFor="cu">Clean Up</label>
                    </div>
                    
                    </div>
                    <div className="responsiveForm">
                    
                    <div className="field">
                    <input type="number" ref={this.pw} name="pw" id="pw" placeholder="00" />
                    <label htmlFor="pw">Pull Weeds</label>
                    </div>
                    
                    <div className="field">
                    <input type="number" ref={this.r} name="r" id="r" placeholder="00" />
                    <label htmlFor="r">Rake</label>
                    </div>
                    
                    </div>
                    <div className="responsiveForm">
                    
                    <div className="field">
                    <input type="number" ref={this.lr} name="lr" id="lr" placeholder="00" />
                    <label htmlFor="lr">Leaf Removal</label>
                    </div>
                    
                    <div className="field">
                    <input type="number" ref={this.misc} name="misc" id="misc" placeholder="00" />
                    <label htmlFor="misc">Misc. Labor</label>
                    </div>
                    
                    </div>
                    </div>
                    
                    <h4 className="formSubHeader">NOTES:</h4>
                    
                    <div className="fieldFull">
                    <textarea rows="5" ref={this.notes} name="notes" id="notes" placeholder="Enter a note..."></textarea>
                    </div>
                    
                    <button className="responsiveButton"type="button" onClick={this.validateForm}>Save Order</button>
                    
                    </form>
                    </div>
                    );
                }
            }
            
            export default NewOrder;
            