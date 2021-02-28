import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import edit from "../../img/edit.png";
import editHover from "../../img/editHover.png";
import deleteIcon from "../../img/delete.png";
import deleteHover from "../../img/deleteHover.png";
import newItem from "../../img/new.png";
import refresh from "../../img/refresh.png";
import { Tooltip } from 'react-tippy';

import $ from "jquery";

class CustomerGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      currentPage: [],
      query: [],
      searchResults: "hidden",
      dataAvailable: "dataIsAvailable",
      editURL: "",
      resultsPerPage: 25,
      showInProcess: false
    };
  }
  // FORWARD ARROW
  pageForward = () => {
    global.pageNumber = global.pageNumber + 1;
    this.getData();
  }
  // BACK ARROW
  pageBackward = () => {
    global.pageNumber = global.pageNumber - 1;
    this.getData();
  }
  // CLICK NUMBER
  pageNumber = (e) => {
    let sense = parseInt(e.target.innerHTML);
    global.pageNumber = sense;
    this.getData();
  }
  componentDidMount() {
    this.props.checkUser();
    global.checky = [];
    document.getElementById('spinner').className = "spinnerContainer";
    this.getData();
    document.getElementsByClassName("paginateActive")[0].click();
    let gridHeaders = document.getElementsByClassName("grid_table_head");
    let gridSearch = document.getElementsByClassName("grid_search");
    for (var i = 0; i < gridHeaders.length; i++) {
      gridHeaders[i].addEventListener("click", this.toggleSort.bind(this, i));
    }
    for (var b = 0; b < gridHeaders.length; b++) {
      gridSearch[b].addEventListener("keyup", this.gridSearch.bind(this, i));
    }
    this.gridTrigger();
    setTimeout(() =>
    this.checkBoxes(),
    2000
    );
    /* var shiftHeld = false;
    
    // Turn the shiftHeld flag to true
    $(document).on("keydown", function (e) {
      if (e.shiftKey) {
        shiftHeld = true;
        console.log("shift is being held.")
      }
    });
    
    // Turn the shiftHeld flag to false
    $(document).on("keyup", function () {
      shiftHeld = false;
      console.log("shift is NO LONGER being held.")
    });
    
    // On mouseover, if shifHeld is true, toggle checked state of the mouseovered checkboxes
    // $("input[type='checkbox'].grid-item").on("mouseover", function () {
    
    
    setTimeout(
      () =>
      $("input[type='checkbox']").on("mouseover", function (e) {
        if (shiftHeld) {
          $(this).prop("checked", !$(this).prop("checked"));
        }
      }),
      1500
      ); */
    }
    
    checkBoxes = (e) => {
      var $chkboxes = $('input[type="checkbox"');
      var lastChecked = null;
      
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      
      $chkboxes.on("change", function (e) {
        for (var a = 0; a < $chkboxes.length; a++) {
          var index = global.checky.indexOf($chkboxes[a].id);
          if ($chkboxes[a].checked === true) {
            global.checky.push($chkboxes[a].id);
            global.checky = global.checky.filter(onlyUnique);
          }
          if ($chkboxes[a].checked === false) {
            if (index !== -1) {
              // console.log($chkboxes[a].id + " fook " + index)
              global.checky.splice(index, 1);
            }
          }
        }
        /* console.log(global.checky); */
      })
      $chkboxes.on("click", function (e) {
        if (!lastChecked) {
          lastChecked = this;
          return;
        }
        if (e.shiftKey) {
          var start = $chkboxes.index(this);
          var end = $chkboxes.index(lastChecked);
          $chkboxes.slice(Math.min(start, end), Math.max(start, end) + 1).prop('checked', lastChecked.checked);
        }
        lastChecked = this;
      });
    }
    
    recallChecks = () => {
      if(global.checky.length > 0 && global.checky) {
        for (var b = 0; b < global.checky.length; b++) {
          if(document.getElementById(global.checky[b])) {
            document.getElementById(global.checky[b]).checked = true;
          }
        }
      }
    }
    /* 
    checkTheBoxes = (e) => {
      console.log("trigger for " + e.target.id);
      let checks = document.getElementsByClassName("fancy_check");
      let lastChecked = e.target.id;
      let tf = false;
      document.getElementById("100156").checked = true;
      if (e.shiftKey) {
        e.preventDefault();
        console.log("at least shift was pressed");
        for (var t = 0; t < checks.length; t++) {
          tf = true;
          checks[t].checked = tf;
          if (checks[t].id === lastChecked) {
            console.log("check function returned & found TRUE")
            tf = true;
            checks[t].checked = tf;
          } else {
            tf = false;
            console.log("now set to FALSE")
          }
          
        }
      }
    } */
    
    gridTrigger = () => {
      var tables = document.getElementsByTagName('table');
      
      for (var i = 0; i < tables.length; i++) {
        this.resizableGrid(tables[i]);
      }
    }
    
    resizableGrid = (table) => {
      var row = table.getElementsByTagName('tr')[0],
      cols = row ? row.children : undefined;
      if (!cols) return;
      
      for (var i = 0; i < cols.length; i++) {
        var div = this.createDiv(table.offsetHeight);
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        this.setListeners(div);
      }
      
    }
    
    createDiv = (height) => {
      var div = document.createElement('div');
      div.style.top = 0;
      div.style.right = 0;
      div.style.width = '5px';
      div.style.position = 'absolute';
      div.style.cursor = 'col-resize';
      div.style.userSelect = 'none';
      div.style.height = height + 'px';
      div.className = 'columnSelector';
      return div;
    }
    
    setListeners = (div) => {
      var pageX, curCol, curColWidth;
      var table1 = document.getElementById('table');
      var table1width = table1.clientWidth;
      div.addEventListener('mousedown', function (e) {
        curCol = e.target.parentElement;
        // nxtCol = curCol.nextElementSibling;
        pageX = e.pageX;
        curColWidth = curCol.offsetWidth;
        /*      if (nxtCol) 
        nxtColWidth = nxtCol.offsetWidth */
      });
      
      document.addEventListener('mousemove', function (e) {
        if (curCol) {
          var diffX = e.pageX - pageX;
          curCol.style.width = (curColWidth + diffX) + 'px';
          // derek inserted
          //console.log(table1width);
          table1.style.width = parseInt(table1width + diffX) + 'px';
          table1.style.backgroundColor = 'red';
          //end D insert
          
        }
      });
      
      document.addEventListener('mouseup', function (e) {
        curCol = undefined;
        // nxtCol = undefined;
        pageX = undefined;
        // nxtColWidth = undefined;
        curColWidth = undefined;
        table1width = table1.clientWidth;
      });
    }
    
    postSearch = (something) => {
      let url = "/params/666";
      axios.put(url, {
        customersGridFilter: something
      })
      this.getData();
      /* console.log("grid SEARCH & getData ran...") */
    };
    
    gridSearch = () => {
      let gridSearch = document.getElementsByClassName("grid_search");
      let query = "";
      for (var a = 0; a < gridSearch.length; a++) {
        if (gridSearch[a].value !== "") {
          if (query === "") {
            query = query + "having " + gridSearch[a].dataset.attrname + " like '%" + gridSearch[a].value + "%'";
          } else {
            query = query + " AND " + gridSearch[a].dataset.attrname + " like '%" + gridSearch[a].value + "%'";
          }
          /* console.log(query); */
          // console.log(document.querySelector('input[dataset.attrname="custID"').value);
          // console.log(gridSearch[a].getAttribute('name') + ' like %' + gridSearch[a].value + "%");
        } else {
          // query = '';  
        }
        global.gridSearch = query;
      }
      this.postSearch(global.gridSearch);
      // console.log(event.target.getAttribute('name') + ' like %' + event.target.value + "%");
    }
    
    gridSort = (something) => {
      let url = "/params/666";
      axios.put(url, {
        customersGridSort: something
      })
      this.getData();
      console.log("grid sort & getData ran...")
    };
    
    toggleSort = (i, event) => {
      /* console.log(event.target.dataset.attrname); */
      let gridHeaders = document.getElementsByClassName("grid_table_head");
      // strip other headers
      for (var x = 0; x < gridHeaders.length && x !== i; x++) {
        gridHeaders[x].className = 'grid_table_head';
      }
      for (var y = gridHeaders.length - 1; y > 0 && y !== i; y--) {
        gridHeaders[y].className = 'grid_table_head';
      }
      // cycle through sort types for clicked header
      if (gridHeaders[i].className === 'grid_table_head') {
        gridHeaders[i].className = 'grid_table_head asc';
        /* let sort = event.target.getAttribute('name') + " asc"; */
        global.sort = " ORDER BY " + event.target.dataset.attrname + " asc";
        /* this.gridSort(sort); */
      } else
      if (gridHeaders[i].className === 'grid_table_head asc') {
        gridHeaders[i].className = 'grid_table_head desc';
        /* let sort = event.target.getAttribute('name') + " desc"; */
        global.sort = " ORDER BY " + event.target.dataset.attrname + " desc";
        /* this.gridSort(sort); */
      }
      else {
        gridHeaders[i].className = 'grid_table_head';
        /* let sort = "custID desc"; */
        global.sort = "ORDER BY custID desc";
        /* this.gridSort(sort); */
      }
      this.gridSort(global.sort);
    }
    
    getData = () => {
      // this.showNoData();
      let url = "/vcustomer";
      axios.get(url).then(response => this.setState({ customers: response.data }, function () {
        this.showNoData();
        this.setDataPerPage();
        setTimeout(() => this.checkBoxes(),
        250)
        setTimeout(() => this.recallChecks(),
        10)
        document.getElementById("pageNumberIncrement").className = "pageNumberIncrement fade-in";
      }, document.getElementById('spinner').className = "spinnerContainer available"));
    };
    showNoData = () => {
      if (this.state.customers.length >= 1) {
        this.setState({ dataAvailable: "dataIsAvailable" });
      } else {
        this.setState({ dataAvailable: "noData" })
      }
    }
    setDataPerPage = () => {
      let recordLow = global.pageNumber * this.state.resultsPerPage - this.state.resultsPerPage;
      let recordHigh = global.pageNumber * this.state.resultsPerPage - 1;
      let currentPageData = [];
      let recordLimit = document.getElementById("helperGrid").childNodes.length;
      let ceil = Math.ceil(document.getElementById("helperGrid").childNodes.length / this.state.resultsPerPage);
      let highestPage = document.getElementById("highestPage");
      if (recordLimit === 0) {
        highestPage.innerHTML = 1;
      } else {
        highestPage.innerHTML = ceil;
      }
      if (recordHigh > recordLimit - 1) {
        recordHigh = recordLimit - 1;
      }
      for (var a = recordLow; a <= recordHigh; a++) {
        currentPageData.push(this.state.customers[a]);
      }
      this.setState({
        currentPage: currentPageData
      });
      // HANDLE HIDE/SHOW OF ENDCAPS
      let currentPage = global.pageNumber;
      let backArrow = document.getElementById("paginateBackArrow");
      let forwardArrow = document.getElementById("paginateForwardArrow");
      let dots = document.getElementById("dotdotdot");
      let dotsLow = document.getElementById("dotdotdotLow");
      let pageMax = document.getElementById("highestPage");
      let pageMin = document.getElementById("lowestPage");
      let pni = document.getElementById("pageNumberIncrement").childNodes;
      pni[0].innerHTML = global.pageNumber - 2;
      pni[1].innerHTML = global.pageNumber - 1;
      pni[2].innerHTML = global.pageNumber;
      pni[3].innerHTML = global.pageNumber + 1;
      pni[4].innerHTML = global.pageNumber + 2;
      if (currentPage === 1) {
        backArrow.className = "paginateArrow hidden";
        pni[1].className = "paginate hidden";
        pni[4].className = "paginate";
      } else {
        backArrow.className = "paginateArrow";
        pni[1].className = "paginate";
        pni[4].className = "paginate hidden";
      }
      if (currentPage - 1 <= parseInt(pageMin.innerHTML)) {
        pageMin.className = "paginate hidden";
        dotsLow.className = "paginatedotdotdot hidden";
      } else {
        pageMin.className = "paginate";
        dotsLow.className = "paginatedotdotdot";
      }
      if (currentPage === parseInt(pageMax.innerHTML)) {
        forwardArrow.className = "paginateArrow hidden";
        pni[3].className = "paginate hidden";
        pni[0].className = "paginate";
      } else {
        forwardArrow.className = "paginateArrow";
        pni[3].className = "paginate";
        pni[0].className = "paginate hidden";
      }
      if (currentPage + 1 >= parseInt(pageMax.innerHTML)) {
        pageMax.className = "paginate hidden";
        dots.className = "paginatedotdotdot hidden";
      } else {
        pageMax.className = "paginate";
        dots.className = "paginatedotdotdot";
      }
      if (currentPage === parseInt(pageMin.innerHTML) && currentPage === parseInt(pageMax.innerHTML)) {
        pni[0].className = "paginate hidden";
        pni[4].className = "paginate hidden";
      }
      if (parseInt(pageMax.innerHTML) === 2 && currentPage === 1) {
        pni[4].className = "paginate hidden";
      }
      if (parseInt(pageMax.innerHTML) === 2 && currentPage === 2) {
        pni[0].className = "paginate hidden";
      }
      document.getElementById("pageNumberIncrement").className = "pageNumberIncrement fade-in";
    }
    resultsPerPage = (e) => {
      document.getElementById("pageNumberIncrement").className = "pageNumberIncrement transparent";
      let rppc = document.getElementById("numberPerPage").childNodes;
      for (var i = 0; i < rppc.length; i++) {
        rppc[i].className = "paginate";
      }
      e.target.className = "paginate paginateActive";
      let pni = document.getElementById("pageNumberIncrement").childNodes;
      pni[0].innerHTML = -1;
      pni[1].innerHTML = 0;
      pni[2].innerHTML = 1;
      pni[3].innerHTML = 2;
      pni[4].innerHTML = 3;
      global.pageNumber = 1;
      this.setState({
        resultsPerPage: e.target.innerHTML
      }, function () {
        this.setDataPerPage();
      })
    }
    stickyHeader = () => {
      let scrollY = document.getElementsByClassName("grid")[0].scrollTop;
      let header = document.getElementsByTagName("th");
      for (var i = 0; i < header.length; i++) {
        scrollY = document.getElementsByClassName("grid")[0].scrollTop;
        header[i].style.top = scrollY + "px";
      }
    }
    deleteCustomer = (someCustomer) => {
      // eslint-disable-next-line
      let url = "/customer/" + `${someCustomer}`
      axios.delete(url)
      .then(response => {
        this.getData();
      })
    }
    editCustomer = (someCustomer) => {
      // eslint-disable-next-line
      let url = "/editcustomer/" + `${someCustomer}`;
      this.setState({
        editURL: url
      })
    }
    
    // GET READY
    
    render() {
      return (
        <div className="customer datagrid">
        
        <h3>Customers</h3>
        
        <div className="gridToolbox">

        
        <div className="gridTool">
          <Tooltip className="tippen" title='Refresh Grid' position='bottom-start'>
            <img alt="Clear Grid" className="gridToolIcon" src={refresh} />
          </Tooltip>
        </div>
        
        
        <div className="gridTool">
        <Tooltip title='New Customer' position='bottom-start'>
            <img alt="New Customer" className="gridToolIcon" src={newItem} />
          </Tooltip>
        </div>
        </div>
        
        <div onScroll={this.stickyHeader} className="grid">
        
        <table id="table">
        <tbody>
        
        <tr>
        <th colSpan="2" className="id_header" id="custID_header"><span data-attrname="custID" className="grid_table_head">Customer ID</span></th>
        <th id="sku_header"><span data-attrname="name" className="grid_table_head">Name</span></th>
        <th id="title_header"><span data-attrname="company" className="grid_table_head">Company</span></th>
        <th className="phone_header" id="price_header"><span data-attrname="phone" className="grid_table_head">Phone #</span></th>
        <th id="flat_rate_header"><span data-attrname="email" className="grid_table_head">Email</span></th>
        <th id="cost_header"><span data-attrname="address" className="grid_table_head">Address</span></th>
        <th id="category_header"><span data-attrname="notes" className="grid_table_head">Notes</span></th>
        <th className="action_header_2" id="action_header">Action</th>
        </tr>
        
        <tr>
        <th className="id_header" colSpan="2"><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" data-attrname="custID" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" data-attrname="name" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" data-attrname="company" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" data-attrname="phone" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" data-attrname="email" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" data-attrname="address" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" data-attrname="notes" type="text" /></th>
        <th></th>
        </tr>
        
        {this.state.currentPage.map(p => (
          <tr key={p.custID}>
          <td className="grid_checkbox">
          {/*                     <span className="grid_checkbox_span"> */}
          <input id={p.custID} type="checkbox" />
          {/*                       <label className="cbx" htmlFor={p.custID}>
          <div className="flip">
          <div className="front"></div>
          <div className="back">
          <svg width="16" height="14" viewBox="0 0 16 14">
          <path d="M2 8.5L6 12.5L14 1.5"></path>
          </svg>
          </div>
          </div>
          </label>
        </span> */}
        </td>
        <td className="id_table_data"><span className="id_table_data_span">{p.custID}</span></td>
        <td>{p.name}</td>
        <td>{p.company}</td>
        <td>{p.phone}</td>
        <td>{p.email}</td>
        <td>{p.address}</td>
        <td>{p.notes}</td>
        <td>
        <div className="actionTableData">
        <div className="actionIconsContainer">
        <span title="Edit Customer"><img alt="edit" className="visible actionEdit" src={edit} /></span>
        <Link to={this.state.editURL}><span onMouseOver={() => this.editCustomer(p.custID)} title="Edit Customer"><img alt="edit" className="hiddenIcon actionEdit" src={editHover} /></span></Link>
        </div>
        <div className="actionIconsContainer">
        <span title="Delete Customer"><img alt="delete" className="visible actionDelete" src={deleteIcon} /></span>
        <span onClick={() => this.deleteCustomer(p.custID)} title="Delete Customer"><img alt="delete" className="hiddenIcon actionDelete" src={deleteHover} /></span>
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
      {this.state.customers.map(p => (
        <p key={p.custID}>{p.custID}</p>
        ))
      }
      </div>
      </div>
      );
    }
  }
  
  export default CustomerGrid;