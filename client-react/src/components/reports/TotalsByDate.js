import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class TotalsByDate extends React.Component {  
    constructor(props) {
        super(props);
        this.state = { 
            reportData: [],
            reportTotals: [],
            currentPage: [],
            dataAvailable: "noData",
            pageTitle: "New Customer",
            editURL: "",
            resultsPerPage: 50,
            pageNumber: 1
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
        
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.resultsPerPage = this.resultsPerPage.bind(this);
        this.setDataPerPage = this.setDataPerPage.bind(this);
        // this.pageNumber = this.pageNumber.bind(this);
        // this.pageMaxMin = this.pageMaxMin.bind(this);
        // this.handleApproachPageLimit = this.handleApproachPageLimit.bind(this);
        // this.pageForward = this.pageForward.bind(this);
        // this.pageBackward = this.pageBackward.bind(this);
    }
    
    componentDidMount() {
        this.props.checkUser();
        this.showSpinner();
        this.getData();
        this.forceUpdate();
    }
    
    componentWillUnmount() {
        this.setState({
            reportData: []
        },function(){
            this.getData();
        });
    }
    
    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 0)) // 2 seconds
    }
    
    showSpinner = () => {
        const ele = document.getElementById("spinner");
        ele.className = "spinnerContainer";
    }
    
    hideSpinner = () => {
        this.authenticate().then(() => {
            const ele = document.getElementById("spinner");
            if(ele){
                // fade out
                ele.classList.add('available')
            }
            setTimeout(() => {
                this.gridFormat();
            }, 100);
        })
    }
    
    showNoData = () => {
        if(this.state.reportData.length >= 1) {
            this.setState({dataAvailable: "dataIsAvailable"})
        } else {
            this.setState({dataAvailable: "noData"})
        }
    }
    
    formatNumber = (n) => {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    
    
    formatCurrency = (something, blur) => {
        var input_val = something.innerHTML;
        if (input_val === "") { return; }
        if (input_val.indexOf(".") >= 0) {
            var decimal_pos = input_val.indexOf(".");
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);
            left_side = this.formatNumber(left_side);
            right_side = this.formatNumber(right_side);
            //if (blur === "blur") {
            right_side += "00";
            //}
            right_side = right_side.substring(0, 2);
            input_val = "$" + left_side + "." + right_side;
        } else {
            input_val = this.formatNumber(input_val);
            input_val = "$" + input_val;
            input_val += ".00";
        }
        something.innerHTML = input_val;
    }
    
    
    gridFormat = () => {
/*         let cells1 = document.getElementsByTagName("td");
        for(var c = 0; c < cells1.length; c++) {
            if((cells1[c].className === "currencyField" && cells1[c].innerHTML === "") || 
            (cells1[c].className === "currencyField" && parseInt(cells1[c].innerHTML * 100) === 0)) {
                cells1[c].innerHTML = " - ";
            }
            if(cells1[c].className === "currencyField" && cells1[c].innerHTML !== "" && cells1[c].innerHTML !== " - ") {
                this.formatCurrency(cells1[c]);   
            }
            if(cells1[c].className === "dateField" && cells1[c].innerHTML !== "") {
                let str = cells1[c].innerHTML;
                let formatted = str.substring(5,7) + "/" + str.substring(8,10) + "/" + str.substring(0,4);
                cells1[c].innerHTML = formatted;
                cells1[c].className = "dateField formatted";
            }
        } */
        this.hideSpinner();
    }
    
    deleteCustomer = (someone) => {
        // eslint-disable-next-line
        let url = "/customer/" + `${someone}`
        axios.delete(url)
        .then(response => {
            this.getData();
        })
    }
    
    editCustomer = (someone) => {
        // eslint-disable-next-line
        let url = "/editcustomer/" + `${someone}`;
        this.setState({
            editURL: url
        })
    }
    
    addCustomer = () => {
        let url = "/customer";
        axios.post(url, { 
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            email: this.email.current.value,
            phone: this.phone.current.value,
            mtrate: this.mtrate.current.value,
            mtfrate: this.mtfrate.current.value,
            mtbrate: this.mtbrate.current.value,
            paymentType: this.paymentType.current.value,
            basis: this.basis.current.value,
            day: this.day.current.value,
        }).then(response => {
            // refresh the data
            this.getData();
            // empty the input
            this.firstName.current.value = "";
            this.lastName.current.value = "";
            this.email.current.value = "";
            this.phone.current.value = "";
            this.mtrate.current.value = "";
            this.mtfrate.current.value = "";
            this.mtbrate.current.value = "";
            this.paymentType.current.value = "";
            this.basis.current.value = "";
            this.day.current.value = "";
        });
    };
    
    getData = () => {
        let url = "/reports/totalsbydate";
        axios.get(url).then(response => this.setState({ reportData: response.data }, function() {
            this.showNoData();
            this.setDataPerPage();
            this.getTotals();
            setTimeout(() => {
                this.gridFormat();
            }, 0);
        }));
    };
    
    getTotals = () => {
        let url = "/reports/totals";
        axios.get(url).then(response => this.setState({ reportTotals: response.data }, function() {
        }));
    };
    
    setDataPerPage = () => {
        let recordLow = this.state.pageNumber * this.state.resultsPerPage - this.state.resultsPerPage;
        let recordHigh = this.state.pageNumber * this.state.resultsPerPage - 1;
        let currentPageData = [];
        let recordLimit = document.getElementById("helperGrid").childNodes.length;
        let ceil = Math.ceil(document.getElementById("helperGrid").childNodes.length / this.state.resultsPerPage);
        let highestPage = document.getElementById("highestPage");
        
        highestPage.innerHTML = ceil;
        if(recordHigh > recordLimit - 1) {
            recordHigh = recordLimit - 1;
        }
        for(var a = recordLow; a <= recordHigh; a++) {
            currentPageData.push(this.state.reportData[a]);
        }
        //    this.pageMaxMin();
        //    this.handleApproachPageLimit();
        this.setState({
            currentPage: currentPageData
        },  this.handleEnds())
    }
    
    resultsPerPage = (e) => {
        let rppc = document.getElementById("numberPerPage").childNodes;
        for(var i = 0; i < rppc.length; i++) {
            rppc[i].className="paginate";
        }
        e.target.className = "paginate paginateActive";
        
        let pni = document.getElementById("pageNumberIncrement").childNodes;
        pni[0].innerHTML = -1;
        pni[1].innerHTML = 0;
        pni[2].innerHTML = 1;
        pni[3].innerHTML = 2;
        pni[4].innerHTML = 3;
        
        this.setState({
            resultsPerPage: e.target.innerHTML,
            pageNumber: 1
        },function(){
            this.setDataPerPage();
        })
    }
    
    // PAGINATION
    // PAGINATION
    // PAGINATION
    // PAGINATION
    
    // FORWARD ARROW
    pageForward = () => {
        let pni = document.getElementById("pageNumberIncrement").childNodes;
        
        for(var b = 0; b < pni.length; b++){
            pni[b].innerHTML = parseInt(pni[b].innerHTML) + 1;
        }
        
        this.setState({
            pageNumber: this.state.pageNumber + 1
        },this.getData())
    }
    
    // BACK ARROW
    pageBackward = () => {
        let pni = document.getElementById("pageNumberIncrement").childNodes;
        
        for(var b = 0; b < pni.length; b++){
            pni[b].innerHTML = parseInt(pni[b].innerHTML) - 1;
        }
        
        this.setState({
            pageNumber: this.state.pageNumber - 1
        },this.getData())
    }
    
    // CLICK NUMBER
    pageNumber = (e) => {
        let sense = parseInt(e.target.innerHTML);
        let pni = document.getElementById("pageNumberIncrement").childNodes;
        pni[0].innerHTML = sense - 2;
        pni[1].innerHTML = sense - 1;
        pni[2].innerHTML = sense;
        pni[3].innerHTML = sense + 1;
        pni[4].innerHTML = sense + 2;
        
        this.setState({
            pageNumber: sense
        },this.getData())
        
    }
    
    // HANDLE HIDE/SHOW OF ENDCAPS
    handleEnds = () => {
        let currentPage = this.state.pageNumber;
        let backArrow = document.getElementById("paginateBackArrow");
        let forwardArrow = document.getElementById("paginateForwardArrow");
        let dots = document.getElementById("dotdotdot");
        let dotsLow = document.getElementById("dotdotdotLow");
        let pageMax = document.getElementById("highestPage");
        let pageMin = document.getElementById("lowestPage");
        let pni = document.getElementById("pageNumberIncrement").childNodes;
        
        if(currentPage === 1){
            backArrow.className = "paginateArrow hidden";
            pni[1].className = "paginate hidden";
            pni[4].className = "paginate";
        } else {
            backArrow.className = "paginateArrow";
            pni[1].className = "paginate";
            pni[4].className = "paginate hidden";
        }
        
        if(currentPage - 1 <= parseInt(pageMin.innerHTML)) {
            pageMin.className = "paginate hidden";
            dotsLow.className = "paginatedotdotdot hidden";
        } else {
            pageMin.className = "paginate";
            dotsLow.className = "paginatedotdotdot";
        }
        
        if(currentPage === parseInt(pageMax.innerHTML)) {
            forwardArrow.className = "paginateArrow hidden";
            pni[3].className = "paginate hidden";
            pni[0].className = "paginate";
        } else {
            forwardArrow.className = "paginateArrow";
            pni[3].className = "paginate";
            pni[0].className = "paginate hidden";
        }
        
        if(currentPage + 1 >= parseInt(pageMax.innerHTML)) {
            pageMax.className = "paginate hidden";
            dots.className = "paginatedotdotdot hidden";
        } else {
            pageMax.className = "paginate";
            dots.className = "paginatedotdotdot";
        }
        
        if(currentPage === parseInt(pageMin.innerHTML) && currentPage === parseInt(pageMax.innerHTML)) {
            pni[0].className = "paginate hidden";
            pni[4].className = "paginate hidden";
        }
        
        if(parseInt(pageMax.innerHTML) === 2 && currentPage === 1) {
            pni[4].className = "paginate hidden";
        }
        
        if(parseInt(pageMax.innerHTML) === 2 && currentPage === 2) {
            pni[0].className = "paginate hidden";
        }
        
    }
    
    // HANDLE WHEN ONLY 1-2 PAGES
    
    
    // RENDER
    // RENDER
    // RENDER
    // RENDER
    
    render() {
        
        return (
            <div className="customer"> 
            <h3>Totals By Date</h3>
            <div className="grid">
            <table className="gridTable">
            <tbody id="customerGrid">
            <tr>
            <th>Date</th>
            <th>Cash ($)</th>
            <th>Credit ($)</th>
            <th>Total ($)</th>
            </tr>
            {this.state.reportData.map(p => (
                <tr key={p.serviceDate}>
                <td className="dateField">{p.serviceDate}</td>
                <td className="currencyField">{p.cash}</td>
                <td className="currencyField">{p.credit}</td>
                <td className="currencyField">{p.total}</td>
                </tr>
                ))}
                
                {this.state.reportTotals.map(p => (
                    
                    <tr className="totalsRow" key="totalsRow">
                    
                    <td className="subheadField">Totals:</td>
                    <td className="currencyField">{p.cash}</td>
                    <td className="currencyField">{p.credit}</td>
                    <td className="currencyField">{p.total}</td>
                    
                    </tr>
                    
                    ))}
                    
                    <tr className={this.state.dataAvailable}>
                    <td colSpan="11">No Data Available.</td>
                    </tr>
                    </tbody>
                    </table>
                    </div>
                    
                    <div className="paginationContainer hidden">
                    
                    <div className="numberPerPageContainer">
                    <label>Results Per Page</label>
                    
                    <div id="numberPerPage" className="numberPerPage">
                    
                    <div onClick={this.resultsPerPage} className="paginate">3</div>
                    <div onClick={this.resultsPerPage} className="paginate">10</div>
                    <div onClick={this.resultsPerPage} className="paginate">25</div>
                    <div onClick={this.resultsPerPage} className="paginate paginateActive">50</div>
                    
                    </div>
                    
                    </div>
                    
                    <div className="pageNumberContainer">
                    <label>Page Number</label>
                    
                    <div id="pageNumber" className="pageNumber">
                    
                    <div onClick={this.pageBackward} id="paginateBackArrow" className="paginateArrow">&larr;</div>
                    <div onClick={this.pageNumber} id="lowestPage" className="paginate">1</div>
                    <div id="dotdotdotLow" className="paginatedotdotdot">...</div>
                    
                    <div className="pageNumberIncrement" id="pageNumberIncrement">
                    <div onClick={this.pageNumber} className="paginate hidden">-1</div>
                    <div onClick={this.pageNumber} className="paginate">0</div>
                    <div onClick={this.pageNumber} className="paginate paginateActive">1</div>
                    <div onClick={this.pageNumber} className="paginate">2</div>
                    <div onClick={this.pageNumber} className="paginate hidden">3</div>
                    </div>
                    
                    <div id="dotdotdot" className="paginatedotdotdot">...</div>
                    <div onClick={this.pageNumber} id="highestPage" className="paginate">4</div>
                    <div onClick={this.pageForward} id="paginateForwardArrow" className="paginateArrow">&rarr;</div>
                    
                    </div>
                    </div>
                    </div>
                    
                    <div id="helperGrid" className="helperGrid">
                    {this.state.reportData.map(p => (
                        <p key={p.serviceDate}>{p.customerid}</p>
                        ))}
                        </div>
                        
                        </div>
                        );
                    }
                }
                
                export default withRouter(TotalsByDate);
                