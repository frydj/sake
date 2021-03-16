import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ProductsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      products: [],
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
    document.getElementById('spinner').className = "spinnerContainer";
    this.getData();
    document.getElementsByClassName("paginateActive")[0].click();
    let gridHeaders = document.getElementsByClassName("grid_table_head");
    let gridSearch = document.getElementsByClassName("grid_search");
    for (var i = 0; i < gridHeaders.length; i++) {
      gridHeaders[i].addEventListener("click",this.toggleSort.bind(this,i));
    }
    for (var b = 0; b < gridHeaders.length; b++) {
      gridSearch[b].addEventListener("keyup",this.gridSearch.bind(this,i));
    }
  }
    
    toggleSort = (i, event) => {
      let gridHeaders = document.getElementsByClassName("grid_table_head");
      // strip other headers
      for (var x = 0; x < gridHeaders.length && x !== i; x++) {
        gridHeaders[x].className = 'grid_table_head';
      }
      for (var y = gridHeaders.length - 1; y > 0 && y !== i; y--) {
        gridHeaders[y].className = 'grid_table_head';
      }
      // cycle through sort types for clicked header
      if(gridHeaders[i].className === 'grid_table_head') {
        gridHeaders[i].className = 'grid_table_head asc';
        console.log(event.target.getAttribute('name') + " asc");
      } else
      if (gridHeaders[i].className === 'grid_table_head asc') {
        gridHeaders[i].className = 'grid_table_head desc';
        console.log(event.target.getAttribute('name') + " desc");
      }
      else {
        gridHeaders[i].className = 'grid_table_head';
        console.log('product_id desc');
      }
    }
    
    gridSearch = () => {
      let gridSearch = document.getElementsByClassName("grid_search");
      let query = "";
      for (var a = 0; a < gridSearch.length; a++) {
        if(gridSearch[a].value !== "") {
          if (query === "") {
            query = query + gridSearch[a].getAttribute('name') + " like '%" + gridSearch[a].value + "%'";
          } else {
            query = query + " AND " + gridSearch[a].getAttribute('name') + " like '%" + gridSearch[a].value + "%'";
          }
          console.log(query);
          console.log(document.querySelector('input[name="product_id"').value);
          // console.log(gridSearch[a].getAttribute('name') + ' like %' + gridSearch[a].value + "%");
        }
      }
      this.getData();
      // console.log(event.target.getAttribute('name') + ' like %' + event.target.value + "%");
    }

    whereState = () => {
      let url = "/products/where";
      axios.post(url, { 
          // brand: this.brand.current.value,
      })
  };

    getData = () => {
      // this.showNoData();
      let url = "/vproduct";
      axios.get(url).then(response => this.setState({ products: response.data },function() {
        this.showNoData();
        this.setDataPerPage();
        document.getElementById("pageNumberIncrement").className = "pageNumberIncrement fade-in";
      },document.getElementById('spinner').className = "spinnerContainer available"));
    };
    showNoData = () => {
      if(this.state.products.length >= 1) {
        this.setState({dataAvailable: "dataIsAvailable"});
      } else {
        this.setState({dataAvailable: "noData"})
      }
    }
    setDataPerPage = () => {
      let recordLow = global.pageNumber * this.state.resultsPerPage - this.state.resultsPerPage;
      let recordHigh = global.pageNumber * this.state.resultsPerPage - 1;
      let currentPageData = [];
      let recordLimit = document.getElementById("helperGrid").childNodes.length;
      let ceil = Math.ceil(document.getElementById("helperGrid").childNodes.length / this.state.resultsPerPage);
      let highestPage = document.getElementById("highestPage");
      if(recordLimit === 0) {
        highestPage.innerHTML = 1;
      } else {
        highestPage.innerHTML = ceil;
      }
      if(recordHigh > recordLimit - 1) {
        recordHigh = recordLimit - 1;
      } 
      for(var a = recordLow; a <= recordHigh; a++) {
        currentPageData.push(this.state.products[a]);
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
      document.getElementById("pageNumberIncrement").className = "pageNumberIncrement fade-in";
    }
    resultsPerPage = (e) => {
      document.getElementById("pageNumberIncrement").className = "pageNumberIncrement transparent";
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
      global.pageNumber = 1;
      this.setState({
        resultsPerPage: e.target.innerHTML
      },function(){
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
    deleteProduct = (someProduct) => {
      // eslint-disable-next-line
      let url = "/product/" + `${someProduct}`
      axios.delete(url)
      .then(response => {
        this.getData();
      })
    }
    editProduct = (someProduct) => {
      // eslint-disable-next-line
      let url = "/editproduct/" + `${someProduct}`;
      this.setState({
        editURL: url
      })
    }
    
    // GET READY
    
    render() {
      return (
        <div className="customer datagrid">           
        <h3>Products</h3>
        <div onScroll={this.stickyHeader} className="grid">
        
        <table>
        <tbody>
        
        <tr>
        <th name="product_id" className="grid_table_head desc" id="product_id_header">Product ID</th>
        <th name="sku" className="grid_table_head" id="sku_header">SKU/Code</th>
        <th name="title" className="grid_table_head" id="title_header">Title</th>
        <th name="price" className="grid_table_head" id="price_header">Price</th>
        <th name="surcharge" className="grid_table_head" id="flat_rate_header">Flat Rate</th>
        <th name="cost" className="grid_table_head" id="cost_header">Cost</th>
        <th name="category" className="grid_table_head" id="category_header">Category</th>
        <th name="subcategory" className="grid_table_head" id="subcategory_header">Subcategory</th>
        <th name="stock_level" className="grid_table_head" id="stock_header">Stock</th>
        <th id="action_header">Action</th>
        </tr>
        
        <tr>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="product_id" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="sku" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="title" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="price" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="surcharge" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="cost" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="category" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="subcategory" type="text" /></th>
        <th><span><i className="fa fa-search" aria-hidden="true"></i></span><input className="grid_search" name="stock_level" type="text" /></th>
        <th></th>
        </tr>
        
        {this.state.currentPage.map(p => (
          <tr key={p.product_id}>
          <td>{p.product_id}</td>
          <td>{p.sku}</td>
          <td>{p.title}</td>
          <td className="priceField"><span className="gridPriceContainer"><span className="unitType">{p.unit_type}</span><span className="currencyField">{p.price}</span></span></td>
          <td className="currencyField">{p.surcharge}</td>
          <td className="currencyField">{p.cost}</td>
          <td>{p.category}</td>
          <td>{p.subcategory}</td>
          <td>{p.stock}</td>
          <td>
          <div className="actionTableData">
          <div className="actionIconsContainer">
          <span title="Edit Product"><img alt="edit" className="visible actionEdit" src={edit} /></span>
          <Link to={this.state.editURL}><span onMouseOver={() => this.editProduct(p.product_id)} title="Edit Product"><img alt="edit" className="hiddenIcon actionEdit" src={editHover} /></span></Link>
          </div>
          <div className="actionIconsContainer">
          <span title="Delete Product"><img alt="delete" className="visible actionDelete" src={deleteIcon} /></span>
          <span onClick={() => this.deleteProduct(p.product_id)} title="Delete Product"><img alt="delete" className="hiddenIcon actionDelete" src={deleteHover} /></span>
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
        {this.state.products.map(p => (
          <p key={p.product_id}>{p.orderid}</p>
          ))
        }
        </div>
        </div>
        );
      }
    }
    
    export default ProductsGrid;