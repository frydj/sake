import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import $ from 'jquery'; 

class editOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders: [],
            orderDetail: [],
            query: [],
            searchResults: "hidden",
            dataAvailable: "noData",
            activeOrder: "",
            activeCustomer: "",
            orderFound: "found",
            downCount: 0
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
        this.getData();
        this.getSearchData();
        // copied from edit customer
        var currentLocation = window.location.pathname;
        var thisOrder = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);
        this.setState({
            activeOrder: thisOrder
        }, function() {
            this.getOrderDetail();
            this.getData();
        });
    }
    
    showNoData = () => {
        if(this.state.orders.length >= 1) {
            this.setState({dataAvailable: "dataIsAvailable"})
        } else {
            this.setState({dataAvailable: "noData"})
        }
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
    
    getOrderDetail = () => {
        // eslint-disable-next-line
        let url = "/orderdetail/" + `${this.state.activeOrder}`;
        axios.get(url)
        .then(response => {
            if(response.data === null) {
                this.setState({
                    orderFound: "notFound"
                })
            } else {
                let thisCustomer = "(#" + response.data.customerid + ") " + response.data.customerName;
                let responseArray = [];
                responseArray.push(response.data);
                this.setState({ 
                    orderDetail: responseArray,
                    orderFound: "found",
                    activeCustomer: thisCustomer
                }, function() {
                    this.showNoData();
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    };
    
    getData = () => {
        // eslint-disable-next-line
        let url = "/order/" + `${this.state.activeOrder}`;
        axios.get(url)
        .then(response => {
            if(response.data === null) {
                this.setState({
                    orderFound: "notFound"
                })
            } else {
                let responseArray = [];
                responseArray.push(response.data);
                this.setState({ 
                    orders: responseArray,
                    orderFound: "found"
                }, function() {
                    this.showNoData();
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    };
    
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
    
    deleteOrder = (someOrder) => {
        // eslint-disable-next-line
        let url = "/order/" + `${someOrder}`
        axios.delete(url)
        //    .catch(function (error) {
        //      console.log("Deletion failed with error: " + error);
        //    })
        .then(response => {
            this.getData();
        })
    }
    
    updateOrder = () => {
        // eslint-disable-next-line
        let url = "/order/" + `${this.orderid.current.value}`;
        axios.put(url, { 
            customerid: this.customerid.current.value,
            serviceDate: this.serviceDate.current.value,
            service: this.service.current.value,
            cu: this.cu.current.value,
            pw: this.pw.current.value,
            r: this.r.current.value,
            lr: this.lr.current.value,
            misc: this.misc.current.value,
            notes: this.notes.current.value,
        })
        .then(response => {
            this.props.history.push('/orders');
        });
    }
    
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
            ) {
                // DO NOTHING
            } else {
                this.updateOrder();
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
        
        validateServiceDate2 = (e) => {
            if (e.keyCode === 8 || e.keyCode === 46) {
                this.validateServiceDate();
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
        
        searchResultsResetClasses = () => {
            for(var i = 0; i < document.getElementById("searchResults").childNodes.length; i++) {
                document.getElementById("searchResults").childNodes[i].className = "customerSearchResult";           
            }
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
            
            // for(var i = 0; i < document.getElementById("searchResults").childNodes.length; i++) {
            //     document.getElementById("searchResults").childNodes[i].className = "customerSearchResult";           
            // }
            
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
                
            }
            
            else if (e.keyCode === 38) {
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
            }
            
            else if (e.keyCode === 13) {
                // enter
                document.getElementById("searchResults").childNodes[myCount].click();           
            }
        }
        
        render() {
            
            return (
                <div ref={this.newOrder} className="customer">
                
                <div className={this.state.orderFound}>Order Not Found.</div>
                
                {this.state.orderDetail.map(p => (
                    <h3 key={"editOrderHeader"}>Edit Order (#{p.orderid})</h3>
                    ))}
                    
                    <h4 className="formSubHeader">APPOINTMENT:</h4>
                    <div className="responsiveFormContainer">
                    <div className="responsiveForm">
                    
                    
                    {this.state.orderDetail.map(p => (    
                        <form className="subForm" action="" key={this.state.activeCustomer}>
                        
                        <div className="field">
                        <div id="customerErr" className="errorMessage hidden">Please choose a valid customer.</div>
                        <input onKeyDown={this.checkKey} onChange={this.searchThis} onFocus={this.selectContents} type="text" ref={this.searchInput} name="searchInput" id="searchInput" placeholder="Type to Search..." autoComplete="off" defaultValue={this.state.activeCustomer}/>
                        <label htmlFor="searchInput">Customer</label>
                        
                        <div ref={this.searchResults} className={this.state.searchResults}>
                        <div onMouseOver={this.searchResultsResetClasses} id="searchResults" className="searchResults">
                        
                        {this.state.query.map(p => (
                            <div ref={this.searchResult} className="customerSearchResult" key={p.returnedQuery} id={p.customerid} onClick={this.enter} >{p.returnedQuery}</div>
                            ))
                        }
                        
                        </div>
                        {/* SHOULD END ABOUT HERE */}
                        </div>
                        
                        </div>
                        
                        
                        <div className="field hidden">
                        <input type="number" ref={this.customerid} name="customerid" id="customerid" placeholder="1" autoComplete="off" defaultValue={p.customerid}/>
                        <label htmlFor="customerid">Customer ID</label>
                        </div>
                        
                        <div className="field hidden">
                        <input type="number" ref={this.orderid} name="orderid" id="orderid" placeholder="1" autoComplete="off" defaultValue={p.orderid}/>
                        <label htmlFor="orderid">Order ID</label>
                        </div>
                        
                        </form>
                        ))
                    }
                    
                    
                    
                    
                    {this.state.orders.map(p => (
                        <form className="subForm" action="" key={this.state.activeOrder}>
                        
                        <div className="field">
                        <div id="serviceDateErr" className="errorMessage hidden">Please choose a service date.</div>
                        <input onKeyDown={this.validateServiceDate2} onChange={this.validateServiceDate} type="text" ref={this.serviceDate} name="serviceDate" id="serviceDate" placeholder="01/01/2020" defaultValue={p.serviceDate}/>
                        <label htmlFor="serviceDate">Service Date</label>
                        </div>
                        
                        
                        </form>
                        ))}
                        
                        </div>
                        </div>
                        
                        {this.state.orders.map(p => (
                            <form action="" key={this.state.activeCustomer}>
                            
                            
                            <h4 className="formSubHeader">SERVICES RENDERED:</h4>
                            
                            <div className="responsiveFormContainer">
                            <div className="responsiveForm">
                            
                            <div className="field">
                            <div id="serviceErr" className="errorMessage hidden">Please select a service.</div>
                            <select onChange={this.validateService} defaultValue={p.service} ref={this.service} name="service" id="service" >
                            <option value="" disabled>Select...</option>
                            <option value="MT">Mow/Trim</option>
                            <option value="MTF">Mow/Trim (Front Yard)</option>
                            
                            <option value="MTB">Mow/Trim (Back Yard)</option>
                            </select>
                            <label htmlFor="service">Service</label>
                            </div>
                            
                            
                            <div className="field">
                            <input type="number" ref={this.cu} name="cu" id="cu" placeholder="00" defaultValue={p.cu} />
                            <label htmlFor="cu">Clean Up</label>
                            </div>
                            
                            </div>
                            <div className="responsiveForm">
                            
                            <div className="field">
                            <input type="number" ref={this.pw} name="pw" id="pw" placeholder="00" defaultValue={p.pw} />
                            <label htmlFor="pw">Pull Weeds</label>
                            </div>
                            
                            <div className="field">
                            <input type="number" ref={this.r} name="r" id="r" placeholder="00" defaultValue={p.r} />
                            <label htmlFor="r">Rake</label>
                            </div>
                            
                            </div>
                            <div className="responsiveForm">
                            
                            <div className="field">
                            <input type="number" ref={this.lr} name="lr" id="lr" placeholder="00" defaultValue={p.lr} />
                            <label htmlFor="lr">Leaf Removal</label>
                            </div>
                            
                            <div className="field">
                            <input type="number" ref={this.misc} name="misc" id="misc" placeholder="00" defaultValue={p.misc} />
                            <label htmlFor="misc">Misc. Labor</label>
                            </div>
                            
                            </div>
                            </div>
                            
                            <h4 className="formSubHeader">NOTES:</h4>
                            
                            <div className="field">
                            <textarea rows="5" ref={this.notes} name="notes" id="notes" placeholder="Enter a note..." defaultValue={p.notes}></textarea>
                            </div>
                            
                            <button className="responsiveButton" type="button" onClick={this.validateForm}>Update Order</button>
                            
                            </form>
                            ))
                        }
                        
                        </div>
                        );
                    }
                }
                
                export default withRouter(editOrder);
                