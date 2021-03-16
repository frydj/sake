import React from "react";
import axios from "axios";
import $ from 'jquery'; 
import Modal from "../app/Modal";

class NewOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            orders: [],
            query: [],
            productSearch: [],
            cart: [],
            searchResults: "hidden",
            dataAvailable: "noData",
            downCount: -1,
            view: "initial",
            objectType: "Order",
            modal: false
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
        this.searchProduct = this.searchProduct.bind(this);
        this.showHideModal = this.showHideModal.bind(this);
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
        
    showHideModal = (e) => {
        if(global.showHideModal === true) {
            global.showHideModal = false;
        } else if(global.showHideModal === false) {
            global.showHideModal = true;
        }

        let product = {
           product_id: e.target.dataset.product_id,
           title: e.target.dataset.title,
           sku: e.target.dataset.sku,
           price: e.target.dataset.price,
           unit_type: e.target.dataset.unit_type.toUpperCase(),
           qty: e.target.dataset.qty,
           clerk_message: e.target.dataset.clerk_message,
           prompt_price: e.target.dataset.prompt_price,
           prompt_quantity: e.target.dataset.prompt_quantity,
           stock_level: e.target.dataset.stock_level,
           surcharge: e.target.dataset.surcharge,
           surcharge_bool: e.target.dataset.surcharge_bool,
           surcharge_unique: e.target.dataset.surcharge_unique,
           track_stock: e.target.dataset.track_stock,
           out_of_stock: e.target.dataset.out_of_stock,
           line_item_total: (e.target.dataset.price * e.target.dataset.qty)
        }

        this.setState({
            modal: global.showHideModal
        },
        function() {
            setTimeout(() => {
                // console.log("1 second passed")
                // console.log("variable: " + global.showHideModal);
                // console.log("state: " + this.state.modal);
                console.log(product);
            }, 1000)
        })

    }

    componentDidMount = () => {
        global.showHideModal = false;

        let inputs = document.getElementsByTagName("input");
        for ( var i = 0; i < inputs.length; i++ ) {
            inputs[i].setAttribute("autocomplete","off");
        }

        this.posViewType();
        this.searchProduct();
        this.getTotals();
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
    
    searchProduct = () => {
        let productSearchInputValue = document.getElementById("productSearch");
        let url = "/params/666";
        axios.put(url, { 
            // session_id: 666,
            // user: document.getElementById("username").value,
            // password: document.getElementById("password").value,
            productSearchInput: productSearchInputValue.value,
            // logged_in: true,
            posView: this.state.view
        })
        this.getProductSearchData();
    }
    
    addToCart = (event) => {
        this.cartArrows();
        let inCart = this.state.cart;
        let cartArray = {
            product_id: event.target.dataset.product_id,
            title: event.target.dataset.title,
            sku: event.target.dataset.sku,
            price: event.target.dataset.price,
            unit_type: event.target.dataset.unit_type.toUpperCase(),
            qty: event.target.dataset.qty,
            clerk_message: event.target.dataset.clerk_message,
            prompt_price: event.target.dataset.prompt_price,
            prompt_quantity: event.target.dataset.prompt_quantity,
            stock_level: event.target.dataset.stock_level,
            surcharge: event.target.dataset.surcharge,
            surcharge_bool: event.target.dataset.surcharge_bool,
            surcharge_unique: event.target.dataset.surcharge_unique,
            track_stock: event.target.dataset.track_stock,
            out_of_stock: event.target.dataset.out_of_stock,
            line_item_total: (event.target.dataset.price * event.target.dataset.qty)
        };
        // I don't know how this works :) 
        let matches = inCart.filter(function(a){return (a.product_id === cartArray.product_id || a.product_id.substring(0, a.product_id.indexOf("-")) === cartArray.product_id)}).length;
        if( matches < 10 ) {
            matches = "0" + matches;
        }
        for ( var i = 0; i < inCart.length; i++ ) {
            if( inCart[i].product_id === cartArray.product_id ) {
                cartArray.product_id = cartArray.product_id + "-" + matches;
            }
        }
        inCart.push(cartArray);
        let wrapper = document.getElementById("cartDownwardWrapper");
        wrapper.style.opacity = "0";
        this.setState({
            cart: inCart
        }, function() {
            setTimeout(() => {
                this.getTotals();
                var objDiv = document.getElementById("orderContentsContainer");
                objDiv.scrollTop = objDiv.scrollHeight;
                clearTimeout(global.arrowOpacity);
                global.arrowOpacity = setTimeout(() => {
                    wrapper.style.opacity = "1";
                }, 500)
            }, 10)
            this.emptyCart();
            this.formatCurrency("productListedPriceValue");
        })
    }

    getProductSearchData = () => {
        let url = "/productsearch";
        axios.get(url).then(response => this.setState({ productSearch: response.data }));
    };

    posViewType = () => {
        let url = "/params/666";
        axios.get(url).then(response => this.setState({ view: response.data.posView },));
        setTimeout(() => {
            this.getProductSearchData();
            if( this.state.view === "returnedProduct row" ) {
                this.listView();
            } else
            if( this.state.view === "returnedProduct tile" ) {
                this.tileView();
            }
            if( this.state.view === null || this.state.view === "initial" ) {
                this.listView();
            }
        }, 200);
    }

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
        // submit ORDER totals/details to ORDERS table

        // submit each PRODUCT & ORDER ID to the orders products table

        // then refresh page to begin a new order

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
        let customerid = document.getElementById("customerid");
        let serviceDate = document.getElementById("serviceDate");
        if(
            customerid.value === "" ||
            serviceDate.value === ""
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
/*         calculateLove = () => {
            // number of times I think of you
            let thoughtCount = document.getElementsByClassName("thought");

            // all the currency $ in the world
            let worldCurrency = document.getElementById("currency");
            
            // if I had an eighth of a penny for each time I thought of you
            if ( thoughtCount.length > worldCurrency * 8 * 100 ) {
                return true;
            }
        } */
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
        listView = () => {
            // let productSearchInputValue = document.getElementById("productSearch");
            let products = document.getElementsByClassName("returnedProduct");
            let container = document.getElementsByClassName("productSearchResultsTile");
            for ( var i = 0; i < products.length; i++ ) {
                products[i].className = "returnedProduct row"
            }
            for ( var a = 0; a < container.length; a++ ) {
                container[a].className = "productSearchResultsRow"
            }
            document.getElementById("listView").className = "productSearchViewType hidden";
            document.getElementById("tileView").className = "productSearchViewType";
            this.setState({
                view: "returnedProduct row"
            })
            let url = "/params/666";
            axios.put(url, { 
                // session_id: 666,
                // user: document.getElementById("username").value,
                // password: document.getElementById("password").value,
                // productSearchInput: productSearchInputValue.value,
                posView: "returnedProduct row"
                // logged_in: true
            })
        }
        tileView = () => {
            // let productSearchInputValue = document.getElementById("productSearch");
            let products = document.getElementsByClassName("returnedProduct");
            let container = document.getElementsByClassName("productSearchResultsRow");
            for ( var i = 0; i < products.length; i++ ) {
                products[i].className = "returnedProduct tile"
            }
            for ( var a = 0; a < container.length; a++ ) {
                container[a].className = "productSearchResultsTile"
            }
            document.getElementById("tileView").className = "productSearchViewType hidden";
            document.getElementById("listView").className = "productSearchViewType";
            this.setState({
                view: "returnedProduct tile"
            })
            let url = "/params/666";
            axios.put(url, {
                // session_id: 666,
                // user: document.getElementById("username").value,
                // password: document.getElementById("password").value,
                // productSearchInput: productSearchInputValue.value,
                posView: "returnedProduct tile"
                // logged_in: true
            })
        }
        gatherTotals = (someClass, someTarget) => {
            let arr = document.getElementsByClassName(someClass);
            let subtotal = 0;
            for (var i = 0; i < arr.length; i++) {
                subtotal += parseInt(arr[i].innerHTML * 100);
                // console.log(parseInt(totals[i].innerHTML));
            }
            // subtotal = subtotal * 100;
            // console.log(subtotal);
            if(subtotal !== 0) {
                let subtotalLeft = subtotal.toString().substr(0,subtotal.toString().length - 2);
                let subtotalRight = subtotal.toString().substr(subtotalLeft.length, 2);
                // console.log(subtotalLeft + "." + subtotalRight);
                subtotal = subtotalLeft + "." + subtotalRight;
            } else if (subtotal === 0) {
                subtotal = "0.00"
            }
            let orderSubtotal = document.getElementById(someTarget);
            orderSubtotal.innerHTML = subtotal;
        }
        grandTotal = () => {
            let total = document.getElementById("orderTotal");
            let subtotal = document.getElementById("orderSubtotal");
            total.innerHTML = subtotal.innerHTML;
        }
        formatCurrency = (someClass) => {
            let arr = document.getElementsByClassName(someClass);
            for (var i = 0; i < arr.length; i++) {
                arr[i].innerHTML = parseInt(arr[i].innerHTML * 100);
                // console.log(parseInt(totals[i].innerHTML));
                if(arr[i].innerHTML !== "0") {
                    // console.log("doesn't equal zero");
                    let subtotalLeft = arr[i].innerHTML.toString().substr(0,arr[i].innerHTML.toString().length - 2);
                    let subtotalRight = arr[i].innerHTML.toString().substr(subtotalLeft.length, 2);
                    // console.log(subtotalLeft + "." + subtotalRight);
                    arr[i].innerHTML = subtotalLeft + "." + subtotalRight;
                } else if (arr[i].innerHTML === "0") {
                    // console.log("DOES equal zero");
                    arr[i].innerHTML = "0.00"
                }
            }
        }
        getTotals = () => {
            this.gatherTotals("productListedLineItemTotalValue", "orderSubtotal");
            this.grandTotal();
        }
        emptyCart = () => {
            let emptyCart = document.getElementById("emptyCart");
            let cartCount = this.state.cart.length;
            // console.log(cartCount);
            if(cartCount === 0) {
                emptyCart.className = "";
            } else {
                emptyCart.className = "hidden";
            }
        }

        deleteProduct = (event) => {
            // remove this product from the cart array
            // console.log(this.state.cart);
            // console.log(event.target.dataset.product_id);
            let inCart = this.state.cart;
            let filteredArray = inCart.filter(function(a){return (a.product_id !== event.target.dataset.product_id)});
            let wrapper = document.getElementById("cartDownwardWrapper");
            let cartDownward = document.getElementById("cartDownward");
            this.setState({
                cart: filteredArray
            }, function(){
                setTimeout(() => {
                    this.emptyCart();
                    if(cartDownward.style.bottom === "-66px") {
                        wrapper.style.opacity = "0";
                        setTimeout(() => {
                            wrapper.style.opacity = "1";
                            // console.log("my sexy hotdog fingers")
                        },500)
                    }
                },5)
                this.showHideModal();
                this.cartArrows();
            })
        }

        editProduct = (event) => {
            // pop modal
            // populate with product data
            // then update existing product in cart
        }

        cartArrows = () => {
            let top = document.getElementsByClassName("orderContentsContainer")[0];
            // let container = document.getElementsByClassName("orderContentsOuterContainer")[0];
            let cartUpward = document.getElementById("cartUpward");
            let cartDownward = document.getElementById("cartDownward");

            if(top.scrollTop > 0) {
                // arrow appear
                cartUpward.className = "";
                cartUpward.style.animation = "cartUpwardIn 0.2s linear";
                cartUpward.style.top = "-33px";
            }
            if(top.scrollTop === 0) {
                // arrow disappear
                cartUpward.style.animation = "cartUpwardOut 0.2s linear";
                cartUpward.style.top = "-66px";
                // cartUpward.className = "hidden";
            }
            if(top.scrollTop !== top.scrollHeight) {
                cartDownward.className = "";
                cartDownward.style.animation = "cartDownwardIn 0.2s linear";
                cartDownward.style.bottom = "-33px";
            }
            if(top.scrollTop >= (top.scrollHeight - $("#orderContentsContainer").height())) {
                // arrow disappear
                cartDownward.style.animation = "cartDownwardOut 0.2s linear";
                cartDownward.style.bottom = "-66px";
                // cartUpward.className = "hidden";
            }
            /* console.log(top.scrollHeight);
            console.log($("#orderContentsContainer").height()); */
            if($("#orderContentsContainer").height() >= top.scrollHeight) {
                cartUpward.className = "hidden";
                cartDownward.className = "hidden";
                /* console.log("no scroll boy"); */
            }
            // console.log("top scrollTop: " + top.scrollTop);
            // console.log("container height: " + $("#orderContentsContainer").height());
            // console.log("top scrollHeight: " + top.scrollHeight);
        }

        cartArrowUp = () => {
            // document.getElementsByClassName("productListed")[0].scrollIntoView();
            let container = document.getElementById("orderContentsContainer");
            container.scrollTop = 0;
        }
        
        cartArrowDown = () => {
            // document.getElementsByClassName("productListed")[0].scrollIntoView();
            let container = document.getElementById("orderContentsContainer");
            container.scrollTop = container.scrollHeight - $("#orderContentsContainer").height();
        }

        render() {
            return (
                <div ref={this.newOrder} id="newOrderContainer">
                {global.showHideModal ? <Modal closeModal={this.showHideModal} title="Edit Cart Product" /> : null}
                <h3 className="shown" id="pageTitle">New Order (#10001)</h3>
                
                <form autoComplete="chrome-off" action="">
                
                <div id="leftSideContainer">
                <div id="appointmentContainer">
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
                    </div>
                    
                    <h4 className="formSubHeader">PRODUCTS/SERVICES:</h4>
                    
                    <div className="productSearchContainerOuter">
                    <div className="productSearchSearch">
                    <input ref={this.productSearch} autoComplete="chrome-off" onChange={this.searchProduct} id="productSearch" type="text" placeholder="Type or Scan Here to Search..." />
                    <div title="List View" className="productSearchViewType hidden" id="listView" onClick={this.listView}></div>
                    <div title="Tile View" className="productSearchViewType" id="tileView" onClick={this.tileView}></div>
                    </div>
                    <div className="productSearchResultsRow">
                    {this.state.productSearch.map(
                    p => (
                        <div key={p.product_id} 
                        onClick={this.addToCart} 
                        ref={this.productSearchResult} 
                        className={this.state.view} 
                        data-product_id={p.product_id} 
                        data-title={p.title} 
                        data-sku={p.sku} 
                        data-price={p.price}
                        data-unit_type={p.unit_type} 
                        data-qty="1"
                        data-clerk_message={p.clerk_message} 
                        data-prompt_price={p.prompt_price} 
                        data-prompt_quantity={p.prompt_quantity} 
                        data-stock_level={p.stock_level} 
                        data-surcharge={p.surcharge} 
                        data-surcharge_bool={p.surcharge_bool} 
                        data-surcharge_unique={p.surcharge_unique} 
                        data-track_stock={p.track_stock} 
                        data-out_of_stock={p.out_of_stock} 
                        >
                            {p.title}
                        </div>
                        ))
                    }
{/*                     <div className={this.state.view}>returned product</div>
                    <div className={this.state.view}>returned product</div>
                    <div className={this.state.view}>returned product</div>
                    <div className={this.state.view}>returned product</div> */}
                    </div>
                    </div>
                    
                    <h4 className="formSubHeader">NOTES:</h4>
                    
                    <div className="fieldFull">
                    <textarea rows="5" ref={this.notes} name="notes" id="notes" placeholder="Enter a note..."></textarea>
                    </div>
                    
                    </div>
                    
                    <div id="rightSideContainer">
                    
                    <div className="orderContentsContainerHeader">Order Contents</div>
                    <div id="orderContentsOuterContainer" className="orderContentsOuterContainer">
                        <div onClick={this.cartArrowUp} className="hidden" id="cartUpward"><span className="arrowUp"></span></div>
                        <div id="orderContentsContainer" className="orderContentsContainer" onScroll={this.cartArrows}>
                        
                        <div id="emptyCart">Cart is empty.</div>
                        
                        {this.state.cart.map(
                        p => (
                        <div onClick={this.showHideModal} key={p.product_id} className="productListed">
                        <div className="productListedImageContainer">
                        <span className="productListedImage"><img alt="product01" src="https://www.zoro.com/static/cms/product/full/Z1sK8uicpEx_.JPG" /></span>
                        </div>
                        <div className="productListedInfoContainer">
                        <div className="productListedInfoLeftSection">
                        <span className="productListedTitle">{p.title}</span>
                        <span className="productListedSKU">{p.sku}</span>
                        </div>
                        <div className="productListedInfoRightSection">
                            {/* eslint-disable-next-line */}
                        <div className={`productListedInfoRightBaseRate ` + `z` + p.surcharge + `hideIfZero`}>
                        <span className="productListedBaseRate">${p.surcharge}</span>
                        </div>
                        <div className="productListedInfoRightSectionTop">
                        <span className="productListedQuantityIncrement">{p.unit_type}: </span>
                        <span className="productListedQuantity">{p.qty}</span>
                        <span className="productListedPrice">$<span className="productListedPriceValue">{p.price}</span></span>
                        <span className="productListedSalePrice">$112.80</span>
                        </div>
                        <div className="productListedInfoRightSectionBottom">
                        <span className="productListedlineItemTotal">$<span className="productListedLineItemTotalValue">{p.line_item_total}</span></span>
                        </div>
                        </div>
                            <div className="productListedActions">
                                <div data-product_id={p.product_id} onClick={this.deleteProduct} title="Delete Product" className="deleteProductContainer"><span data-product_id={p.product_id} className="deleteProductButton"></span></div>
                            </div>
                        </div>
                        </div>
                            ))
                        }
                        </div>
                        <span id="cartDownwardWrapper"><div onClick={this.cartArrowDown} className="hidden" id="cartDownward"><span className="arrowDown"></span></div></span>                  
                    </div>
                    
                    <div className="orderContentsTotal">
                    <div className="orderTotalContainer">
                    <table>
                    <tbody>
                    <tr>
                    <td>Subtotal:</td>
                    <td>$<span id="orderSubtotal"></span></td>
                    </tr>
{/*                     <tr>
                    <td>Tax:</td>
                    <td>$10.00</td>
                    </tr>
                    <tr>
                    <td>Discount:</td>
                    <td>$5.00</td>
                    </tr> */}
                    <tr className="orderTotalContainerTotal">
                    <td>Total:</td>
                    <td>$<span id="orderTotal"></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </div>
                    </div>
                    
                    <button className="saveOrder green" type="button" onClick={this.validateForm}>Save {this.state.objectType}</button>

                    </div>   
                
                <div className="responsiveFormContainer">
                <div className="responsiveForm">
            
            </div>
            </div>           
            
            </form>
            </div>
            );
        }
    }
    
    export default NewOrder;
    