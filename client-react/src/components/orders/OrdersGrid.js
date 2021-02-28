import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import edit from "../../img/edit.png";
import editHover from "../../img/editHover.png";
import deleteIcon from "../../img/delete.png";
import deleteHover from "../../img/deleteHover.png";

class OrdersGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      orders: [],
      currentPage: [],
      query: [],
      searchResults: "hidden",
      dataAvailable: "noData",
      editURL: "",
      resultsPerPage: 25,
      pageNumber: 1
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
  }
  
  componentDidMount() {
    this.getData();
    this.getSearchData();
    this.showSpinner();
    document.getElementById("pageNumber").className = "hidden";
  }
  
  stickyHeader = () => {
    let scrollY = document.getElementsByClassName("grid")[0].scrollTop;
    // let scrollY = window.scrollY;
    let header = document.getElementsByTagName("th");

    for (var i = 0; i < header.length; i++) {
      scrollY = document.getElementsByClassName("grid")[0].scrollTop;
      header[i].style.top = scrollY + "px";
    }

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
    })
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
    let cells1 = document.getElementsByTagName("td");
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
    }
    document.getElementById("pageNumber").className = "pageNumber fade-in";
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
  
  searchThis = () => {
    if(this.searchInput.current.value === '') {
      this.hideResults();
      this.customerid.current.value = '';
    } else {
      this.showResults();
      let url = "/customersearchinput";
      axios.post(url, { 
        search: this.searchInput.current.value,            
      }).then(response => {
        this.getSearchData();
      });
      this.customerid.current.value = '';
    }
  };
  
  getData = () => {
    let url = "/orderdetail";
    axios.get(url).then(response => this.setState({ orders: response.data },function() {
      this.showNoData();
      this.setDataPerPage();
      this.hideSpinner();
      document.getElementById("pageNumber").className = "pageNumber fade-in";
    }));
  };
  
  getSearchData = () => {
    let url = "/customersearch";
    axios.get(url).then(response => this.setState({ query: response.data }));
  };
  
  enter = (e) => {
    this.searchInput.current.value = e.target.innerHTML;
    this.customerid.current.value = e.target.id;
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
  
  editOrder = (someOrder) => {
    // eslint-disable-next-line
    let url = "/editorder/" + `${someOrder}`;
    this.setState({
      editURL: url
    })
  }
  
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
      // refresh the data
      this.getData();
      
      // empty the input            
      this.customerid.current.value = "";
      this.searchInput.current.value = "";
      this.serviceDate.current.value = "";
      this.service.current.value = "";
      this.cu.current.value = "";
      this.pw.current.value = "";
      this.r.current.value = "";
      this.lr.current.value = "";
      this.misc.current.value = "";
      this.notes.current.value = "";
      
    });
  };
  
  setDataPerPage = () => {
    let recordLow = this.state.pageNumber * this.state.resultsPerPage - this.state.resultsPerPage;
    let recordHigh = this.state.pageNumber * this.state.resultsPerPage - 1;
    let currentPageData = [];
    let recordLimit = document.getElementById("helperGrid").childNodes.length;
    let ceil = Math.ceil(document.getElementById("helperGrid").childNodes.length / this.state.resultsPerPage);
    let highestPage = document.getElementById("highestPage");
    
    // console.log(recordLimit);
    // console.log(ceil);
    // console.log(highestPage);
    
    if(recordLimit === 0) {
      highestPage.innerHTML = 1;
    } else {
      highestPage.innerHTML = ceil;
    }
    if(recordHigh > recordLimit - 1) {
      recordHigh = recordLimit - 1;
    }
    for(var a = recordLow; a <= recordHigh; a++) {
      currentPageData.push(this.state.orders[a]);
    }
    //    this.pageMaxMin();
    //    this.handleApproachPageLimit();
    this.setState({
      currentPage: currentPageData
    },  this.handleEnds())
    setTimeout(() => {
      this.gridFormat();
    }, 0);
  }
  
  resultsPerPage = (e) => {
    document.getElementById("pageNumber").className = "hidden";
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
    document.getElementById("pageNumber").className = "hidden";
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
    document.getElementById("pageNumber").className = "hidden";
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
  
  render() {
    
    return (
      <div ref={this.newOrder} className="customer datagrid">           
      <h3>Orders</h3>
      <div onScroll={this.stickyHeader} className="grid">
      <table>
      <tbody>
      <tr>
      <th>Order ID</th>
      <th>Customer ID</th>
      <th>Customer Name</th>
      <th>Service Date</th>
      <th>Service Rendered</th>
      <th>Clean Up</th>
      <th>Pull Weeds</th>
      <th>Rake</th>
      <th>Leaf Removal</th>
      <th>Misc. Labor</th>
      <th>Mow Total ($)</th>
      <th>Extras Total ($)</th>
      <th>Order Total ($)</th>
      <th>Notes</th>
      <th>Action</th>
      </tr>
      {this.state.currentPage.map(p => (
        <tr key={p.orderid}>
        <td>{p.orderid}</td>
        <td>{p.customerid}</td>
        <td>{p.customerName}</td>
        <td className="dateField">{p.service_date}</td>
        <td>{p.service}</td>
        <td>{p.cu}</td>
        <td>{p.pw}</td>
        <td>{p.r}</td>
        <td>{p.lr}</td>
        <td>{p.misc}</td>
        <td className="currencyField">{p.mow_total}</td>
        <td className="currencyField">{p.extras_total}</td>
        <td className="currencyField">{p.total}</td>
        <td>{p.notes}</td>
        <td>
          <div className="actionTableData">
          <div className="actionIconsContainer">
          <span title="Edit Customer"><img alt="edit" className="visible actionEdit" src={edit} /></span>
        <Link to={this.state.editURL}><span onMouseOver={() => this.editOrder(p.orderid)}title="Edit Order"><img alt="edit" className="hiddenIcon actionEdit" src={editHover} /></span></Link>
          </div>
        <div className="actionIconsContainer">
        <span title="Delete Order"><img alt="delete" className="visible actionDelete" src={deleteIcon} /></span>
        <span onClick={() => this.deleteOrder(p.orderid)} title="Delete Customer"><img alt="delete" className="hiddenIcon actionDelete" src={deleteHover} /></span>
        </div>
        </div>
        </td>
        </tr>
        ))
      }
      <tr className={this.state.dataAvailable}>
      <td colSpan="15">No Data Available.</td>
      </tr>
      </tbody>
      </table>
      </div>
      
      <div className="paginationContainer">
      <div className="numberPerPageContainer">
      <label>Results Per Page</label>
      <div id="numberPerPage" className="numberPerPage">
      <div onClick={this.resultsPerPage} className="paginate">3</div>
      <div onClick={this.resultsPerPage} className="paginate">10</div>
      <div onClick={this.resultsPerPage} className="paginate paginateActive">25</div>
      <div onClick={this.resultsPerPage} className="paginate">50</div>
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
      {this.state.orders.map(p => (
        <p key={p.orderid}>{p.orderid}</p>
        ))
      }
      </div>
      
      
      </div>
      );
    }
  }
  
  export default OrdersGrid;
  