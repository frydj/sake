import React from "react";
import axios from "axios";

class CustomerSearch extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            query: [],
            searchResults: "hidden",
            dataAvailable: "dataIsAvailable"
        };
        this.returnedQuery = React.createRef();       
        this.searchResults = React.createRef();       
        this.searchResult = React.createRef();       
        this.customerid = React.createRef();       
        this.searchInput = React.createRef();

        this.enter = this.enter.bind(this);
        this.toggleSearchResults = this.toggleSearchResults.bind(this);
    };
    
    getInitialState(){
        return {searchResults:"show"};
    };
    
    componentDidMount() {
        this.getData();
    };
    
    showNoData = () => {
        if(this.state.customers.length >= 1) {
            this.setState({dataAvailable: "dataIsAvailable"})
        } else {
            this.setState({dataAvailable: "noData"})
        }
    }

    toggleSearchResults() {
//        var css = (this.state.searchResults === "hidden") ? "show" : "hidden";
//        this.setState({"searchResults":css});
    };

    enter = (e) => {
        this.setState({
            customerid: e.target.id
        })
            this.searchInput.current.value = e.target.innerHTML;
            this.customerid.current.value = e.target.id;
    };

    showResults = () => {
        this.setState({"searchResults":"show"});
    }

    getData = () => {
        let url = "/customersearch";
        axios.get(url).then(response => this.setState({ query: response.data }, function(){
            this.showNoData();
        }));
    };
    
    searchThis = () => {
        let url = "/customersearchinput";
        axios.post(url, { 
            search: this.searchInput.current.value,            
        }).then(response => {
            // refresh the data
            this.getData();
            // this.customerid.current.value = "";
        });

    };
     
    render() {
        
        return (
            
            <div className="customerSearchContainer">

            <div className="field">
            <input onChange={this.searchThis} onFocus={this.toggleSearchResults} type="text" ref={this.searchInput} name="searchInput" id="searchInput" placeholder="Type to Search..." autoComplete="off" />
            <label htmlFor="searchInput">Customer</label>
            </div>

            <div className="field">
            <input type="number" ref={this.customerid} name="customerid" id="customerid" placeholder="1" autoComplete="off" />
            <label htmlFor="customerid">Customer ID</label>
            </div>

            <div ref={this.searchResults} className={this.state.searchResults}>
            <div className="searchResults">
            {this.state.query.map(p => (
                <div ref={this.searchResult} className="customerSearchResult" key={p.customerid} id={p.customerid} onClick={this.enter} >{p.returnedQuery}</div>
                ))}
                </div>
                </div>
                </div>
                );
            }
        }
        
        export default CustomerSearch;
        