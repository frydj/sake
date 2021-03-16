import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import $ from 'jquery'; 
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

class EditProduct extends React.Component {  
    constructor(props) {
        super(props);
        this.state = { products: [],
            dataAvailable: "noData",
            pageTitle: "Edit Product",
            activeProduct: "",
            productFound: "found"
        };
        
        this.productID = React.createRef();
        this.title = React.createRef();
        this.sku = React.createRef();
        this.upc = React.createRef();
        this.shortcode = React.createRef();
        this.price = React.createRef();
        this.cost = React.createRef();
        this.unitType = React.createRef();
        this.surchargeBool = React.createRef();
        this.surchargeUnique = React.createRef();
        this.surcharge = React.createRef();
        this.promptPrice = React.createRef();
        this.promptQuantity = React.createRef();
        this.clerkMessage = React.createRef();
        this.trackStock = React.createRef();
        this.stockLevel = React.createRef();
        this.category = React.createRef();
        this.subcategory = React.createRef();
        this.department = React.createRef();
        this.brand = React.createRef();
        
        this.validateForm = this.validateForm.bind(this);
    }
    
    componentDidMount() {
        //        console.log(currentLocation);
        var currentLocation = window.location.pathname;
        var thisProduct = currentLocation.substring(currentLocation.lastIndexOf('/') + 1);
        this.setState({
            activeProduct: thisProduct
        }, function() {
            this.getData();
        });
        $("#restart").click(function () {
            $(".check-icon").hide();
            setTimeout(function () {
                $(".check-icon").show();
            }, 10);
        });
        this.autoHighlight();
    }
    
    autoHighlight = () => {
        const delegate = (selector) => (cb) => (e) => e.target.matches(selector) && cb(e);
        const inputDelegate = delegate('input');
        document.getElementById('root').addEventListener('click', inputDelegate((el) => 
        el.target.select()
        ));
    }
    
    getBooleanData = () => {
        if(this.state.products[0].surcharge_bool === 'true') {
            document.getElementById('surchargeInput').click();
            document.getElementById('surcharge').blur();
        }
        if(this.state.products[0].track_stock === 'true') {
            document.getElementById('trackStockInput').click();
            document.getElementById('stockLevel').blur();
        }
        if(this.state.products[0].surcharge_unique === 'true') {
            document.getElementById('surchargeUniqueInput').click();
        }
        if(this.state.products[0].out_of_stock === 'true') {
            document.getElementById('outOfStockInput').click();
        }
    }
    
    getData = () => {
        // eslint-disable-next-line
        let url = "/product/" + `${this.state.activeProduct}`;
        axios.get(url)
        .then(response => {
            if(response.data === null) {
                this.setState({
                    productFound: "notFound"
                })
            } else {
                let responseArray = [];
                responseArray.push(response.data);
                this.setState({ 
                    products: responseArray,
                    productFound: "found"
                }, function() {
                    this.showNoData();
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        });
        //console.log(response);
    };
    
    showNoData = () => {
        if(this.state.products.length >= 1) {
            this.setState({dataAvailable: "dataIsAvailable"})
        } else {
            this.setState({dataAvailable: "noData"})
        }
        this.getBooleanData();
    }
    
    updateProduct = () => {
        // eslint-disable-next-line
        let url = "/product/" + `${this.state.products[0].product_id}`;
        axios.put(url, { 
            // productID: this.productID.current.value,
            title: this.title.current.value,
            sku: this.sku.current.value,
            // upc: this.upc.current.value,
            // shortcode: this.shortcode.current.value,
            price: this.price.current.value,
            unit_type: this.unitType.current.value,
            cost: this.cost.current.value,
            surcharge_bool: document.getElementById('surchargeInput').checked,
            surcharge_unique: document.getElementById('surchargeUniqueInput').checked,
            surcharge: this.surcharge.current.value,
            // promptPrice: this.promptPrice.current.value,
            // promptQuantity: this.promptQuantity.current.value,
            // clerkMessage: this.clerkMessage.current.value,
            track_stock: document.getElementById('trackStockInput').checked,
            stock_level: this.stockLevel.current.value,
            out_of_stock: document.getElementById('outOfStockInput').checked,
            category: this.category.current.value,
            subcategory: this.subcategory.current.value,
            // department: this.department.current.value,
            // brand: this.brand.current.value,
        })
        .then(response => {
            this.props.history.push('/products');
        });
    }
    
    addProduct = () => {
        let url = "/product";
        axios.post(url, { 
            // productID: this.productID.current.value,
            title: this.title.current.value,
            sku: this.sku.current.value,
            // upc: this.upc.current.value,
            // shortcode: this.shortcode.current.value,
            price: this.price.current.value,
            unit_type: this.unitType.current.value,
            cost: this.cost.current.value,
            surcharge_bool: document.getElementById('surchargeInput').checked,
            surcharge_unique: document.getElementById('surchargeUniqueInput').checked,
            surcharge: this.surcharge.current.value,
            // promptPrice: this.promptPrice.current.value,
            // promptQuantity: this.promptQuantity.current.value,
            // clerkMessage: this.clerkMessage.current.value,
            track_stock: document.getElementById('trackStockInput').checked,
            stock_level: this.stockLevel.current.value,
            out_of_stock: document.getElementById('outOfStockInput').checked,
            category: this.category.current.value,
            subcategory: this.subcategory.current.value,
            // department: this.department.current.value,
            // brand: this.brand.current.value,
        }).then(response => {
            // refresh the data
            this.props.history.push('/products');
        });
    };
    
    validateForm = () => {
        
        this.validateTitle();
        this.validateSku();
        this.validateStock();
        this.validatePricing();
        
        if(this.state.errorTitle === true ||
            this.state.errorSku === true ||
            this.state.errorStock === true ||
            this.state.errorPricing === true
            ) {} else {
                this.updateProduct();
            }
        }
        
        validateTitle = () => {
            let title = document.getElementById("title");
            let titleErr = document.getElementById("titleErr");
            if(title.value === "") {
                this.setState({"errorTitle": true});
                titleErr.className = "errorMessage";
                title.className = "formValidate";
            } else {
                this.setState({"errorTitle": false});
                titleErr.className = "errorMessage hidden";
                title.className = "";
            }
        }
        
        validateSku = () => {
            let sku = document.getElementById("sku");
            let skuErr = document.getElementById("skuErr");
            if(sku.value === "") {
                this.setState({"errorSku": true});
                skuErr.className = "errorMessage";
                sku.className = "formValidate";
            } else {
                this.setState({"errorSku": false});
                skuErr.className = "errorMessage hidden";
                sku.className = "";
            }
            this.validateDupeSku();
        }
        
        validateDupeSku = () => {
            let sku = document.getElementById("sku");
            let skuDupeErr = document.getElementById("skuDupeErr");
            if(sku.value !== "") {
                if(/* condition to check for duplicate in DB */ false) {
                    this.setState({"errorSku": true});
                    skuDupeErr.className = "errorMessage";
                    sku.className = "formValidate";
                } else {
                    this.setState({"errorSku": false});
                    skuDupeErr.className = "errorMessage hidden";
                    sku.className = "";
                }
            } else {
                skuDupeErr.className = "errorMessage hidden";
            }
        }
        
        validatePricing = () => {
            let price = document.getElementById("price");
            let surcharge = document.getElementById("surcharge");
            let surchargeInput = document.getElementById("surchargeInput");
            let surchargeCheckbox = document.getElementById("surchargeCheckbox");
            let surchargeUniqueInput = document.getElementById("surchargeUniqueInput");
            let surchargeUniqueCheckbox = document.getElementById("surchargeUniqueCheckbox");
            let priceErr = document.getElementById("priceErr");
            
            if(price.value === "" &&
            surcharge.value === "" &&
            surchargeUniqueInput.checked === false) {
                this.setState({"errorPricing": true});
                priceErr.className = "errorMessage";
                price.className = "formValidate";
                if(surchargeInput.checked) {
                    surcharge.className = "formValidate";
                    surchargeUniqueCheckbox.className = "cbx formValidateCheckbox";
                    surchargeCheckbox.className = "cbx";
                } else {
                    surchargeCheckbox.className = "cbx formValidateCheckbox"
                    surcharge.className = "formValidate";
                    surchargeUniqueCheckbox.className = "cbx formValidateCheckbox";
                }
            } else {
                this.setState({"errorPricing": false});
                priceErr.className = "errorMessage hidden";
                price.className = "";
                surcharge.className = "";
                surchargeUniqueCheckbox.className = "cbx";
                surchargeCheckbox.className = "cbx";
            }
        }
        
        validateStock = () => {
            let stockLevel = document.getElementById("stockLevel");
            let trackStockInput = document.getElementById("trackStockInput");
            let outOfStockInput = document.getElementById("outOfStockInput");
            let outOfStockCheckbox = document.getElementById("outOfStockCheckbox");
            let stockErr = document.getElementById("stockErr");
            if(trackStockInput.checked) {
                if(!outOfStockInput.checked && stockLevel.value === '') {
                    this.setState({"errorStock": true});
                    stockErr.className = "errorMessageCheckbox";
                    stockLevel.className = "formValidate";
                    outOfStockCheckbox.className = "formValidateCheckbox cbx";
                } else {
                    this.setState({"errorStock": false});
                    stockErr.className = "errorMessageCheckbox hidden";
                    stockLevel.className = "";
                    outOfStockCheckbox.className = "cbx";
                }
            }
            this.outOfStock();
        }
        
        showFlatRateOptions = () => {
            let surchargeInput = document.getElementById("surchargeInput");
            let surchargeUniqueField = document.getElementById("surchargeUniqueField");
            let surchargeFieldUnique = document.getElementById("surchargeFieldUnique");
            let surchargeCheckbox = document.getElementById("surchargeCheckbox");
            let surchargeField = document.getElementById("surchargeField");
            let surcharge = document.getElementById("surcharge");
            
            if(surchargeInput.checked) {
                surchargeUniqueField.className = "checkboxField fade-in";
                surchargeField.className = "field fade-in";
                surchargeCheckbox.className = "cbx";
                surcharge.select();
            } else {
                surchargeUniqueField.className = "hidden";
                surchargeField.className = "hidden";            
                surchargeFieldUnique.className = "hidden";
            }
            this.uniqueFlatRate();
        }
        
        focusOnStockLevel = () => {
            document.getElementById("stockLevel").select();
        }
        
        focusOnFlatRate = () => {
            document.getElementById("surcharge").select();
        }
        
        showStockOptions = () => {
            let trackStockInput = document.getElementById("trackStockInput");
            // let outOfStockInput = document.getElementById("outOfStockInput");
            let outOfStockInputField = document.getElementById("outOfStockInputField");
            let outOfStockField = document.getElementById("outOfStockField");
            let stockLevelField = document.getElementById("stockLevelField");
            let stockLevel = document.getElementById("stockLevel");
            let stockErr = document.getElementById("stockErr");
            if(trackStockInput.checked) {
                outOfStockField.className = "checkboxField fade-in";
                stockLevelField.className = "field fade-in";
                stockLevel.select();
                window.scroll(0,1000);
                this.outOfStock();
            } else {
                outOfStockField.className = "hidden";
                stockLevelField.className = "hidden";
                stockErr.className = ("hidden");
                outOfStockInputField.className = "hidden"
            }
        }
        
        outOfStock = () => {
            let outOfStockInput = document.getElementById("outOfStockInput");
            let outOfStockInputField = document.getElementById("outOfStockInputField");
            let stockLevelField = document.getElementById("stockLevelField");
            let trackStockInput = document.getElementById("trackStockInput");
            
            if(trackStockInput.checked) {
                if(outOfStockInput.checked) {
                    stockLevelField.className = "hidden";
                    outOfStockInputField.className = "disabledField fade-in"
                } else {
                    stockLevelField.className = "field fade-in";
                    outOfStockInputField.className = "hidden"
                }
            }
        }
        
        uniqueFlatRate = () => {
            let surchargeInput = document.getElementById("surchargeInput");
            let surchargeUniqueInput = document.getElementById("surchargeUniqueInput");
            let surchargeFieldUnique = document.getElementById("surchargeFieldUnique");
            let surchargeField = document.getElementById("surchargeField");
            
            if(surchargeInput.checked) {
                if(surchargeUniqueInput.checked) {
                    surchargeField.className = "hidden";
                    surchargeFieldUnique.className = "disabledField fade-in"
                } else {
                    surchargeField.className = "field fade-in";
                    surchargeFieldUnique.className = "hidden"
                }
            }
        }
        
        render() {
            return (
                <div className="customer">
                <div className={this.state.productFound}>Product Not Found.</div>
                
                {this.state.products.map(p => (
                    <form key={p.product_id} action="">
                    <h3>Edit Product (#{p.product_id})</h3>
                    
                    <div className="responsiveFormContainer">
                    {/*                 <div className="responsiveForm">
                    
                    <div className="radioLabel">
                    <h4 className="formSubHeader">PRODUCT TYPE:</h4>
                    </div>
                    
                    <div className="radioField">
                    <div id="productType" className="errorMessage">Please choose a product type.</div>
                    <label className="radio">
                    <input type="radio" name="r" value="1" />
                    <span>PRODUCT</span>
                    </label>
                    <label className="radio">
                    <input type="radio" name="r" value="2" />
                    <span>LABOR</span>
                    </label>
                    <label className="radio">
                    <input type="radio" name="r" value="3" />
                    <span>SERVICE</span>
                    </label>
                    </div>
                    
                </div>   */}      
                
                <h4 className="formSubHeader">PRODUCT IDENTIFICATION:</h4>
                
                <div className="responsiveForm">
                
                <div className="field">
                <div id="titleErr" className="errorMessage hidden">Please enter a product title.</div>
                <input autoFocus onChange={this.validateTitle} type="text" ref={this.title} name="title" id="title" placeholder="Product Title" defaultValue={p.title} />
                <label htmlFor="title">Title</label>
                </div>
                
                <div className="field">
                <div id="skuErr" className="errorMessage hidden">Please enter a product SKU.</div>
                <div id="skuDupeErr" className="errorMessage hidden">SKU already exists - please enter a unique product SKU.</div>
                <input onChange={this.validateSku} type="text" ref={this.sku} name="sku" id="sku" placeholder="SKU-001" defaultValue={p.sku} />
                <label htmlFor="sku">SKU</label>
                </div>
                
                </div>        
                {/*                 <div className="responsiveForm">
                
                <div className="field">
                <input type="text" ref={this.upc} name="upc" id="upc" placeholder="049000028904" />
                <label htmlFor="upc">UPC</label>
                </div>
                
                <div className="field">
                <input type="text" ref={this.shortcode} name="shortcode" id="shortcode" placeholder="LKP" />
                <label htmlFor="shortcode">Shortcode</label>
                </div>
                
            </div> */}
            </div>
            
            
            
            <h4 className="formSubHeader">PRICING:</h4>
            
            <div className="responsiveFormContainer">
            <div className="responsiveForm">
            
            <div className="field">
            <div id="priceErr" className="errorMessage hidden">Pricing information needed - please enter a unit price and/or select flat rate options.</div>
            <input onChange={this.validatePricing} type="number" step="0.01" ref={this.price} name="price" id="price" placeholder="$100.00" defaultValue={p.price} />
            <label htmlFor="price">Unit Price</label>
            </div>
            
            <div className="field">
            <input type="text" ref={this.unitType} name="unitType" id="unitType" placeholder="each" defaultValue={p.unit_type} />
            <label htmlFor="unitType">Unit Type</label>
            </div>
            
            </div>
            </div>
            
            <div className="responsiveFormContainer">
            <div className="responsiveForm">
            
            <div className="responsiveForm">
            
            <div id="surchargeCheckboxField" className="checkboxField">
            <input onClick={this.showFlatRateOptions} id="surchargeInput" type="checkbox" />
            <label id="surchargeCheckbox" className="cbx" htmlFor="surchargeInput">
            <div className="flip">
            <div className="front"></div>
            <div className="back">
            <svg width="16" height="14" viewBox="0 0 16 14">
            <path d="M2 8.5L6 12.5L14 1.5"></path>
            </svg>
            </div>
            </div>
            </label>                
            <label className="checkboxFieldLabel" htmlFor="surchargeInput">Add Flat Rate</label>
            </div>
            
            <div id="surchargeUniqueField" className="checkboxField hidden">
            <input onClick={() => {
                this.validatePricing();
                this.uniqueFlatRate();
                this.focusOnFlatRate();
            }} id="surchargeUniqueInput" type="checkbox" />
            <label id="surchargeUniqueCheckbox" className="cbx" htmlFor="surchargeUniqueInput">
            <div className="flip">
            <div className="front"></div>
            <div className="back">
            <svg width="16" height="14" viewBox="0 0 16 14">
            <path d="M2 8.5L6 12.5L14 1.5"></path>
            </svg>
            </div>
            </div>
            </label>                
            <label className="checkboxFieldLabel" htmlFor="surchargeUniqueInput">Flat Rate is Unique to Customer</label>
            </div>
            
            </div> {/* contains checkbox */}
            
            <div id="surchargeField" className="field hidden">
            <input onChange={this.validatePricing} type="number" step="1" ref={this.surcharge} name="surcharge" id="surcharge" placeholder="$125.00" defaultValue={p.surcharge} />
            <label htmlFor="surcharge">Flat Rate</label>
            </div>
            
            <div id="surchargeFieldUnique" className="disabledField hidden">
            <Tooltip title='Flat rate for this product will be assigned to each customer individually. To assign a universal flat rate to this product, please uncheck the "Flat Rate is Unique to Customer" checkbox.' position='top-start'>
            <div className="field">
            <input type="text" name="surchargeDisabled" placeholder="$125.00" id="surchargeDisabled" value="Unique to Customer" disabled />
            <label htmlFor="stockLevelOOS">Flat Rate</label>
            </div>
            </Tooltip>
            </div>
            
            </div>
            </div>
            
            <div className="responsiveForm">
            
            
            </div>
            
            <div className="responsiveForm">
            
            <div className="field">
            <input type="number" step="0.01" ref={this.cost} name="cost" id="cost" placeholder="$50.00" defaultValue={p.cost} />
            <label htmlFor="cost">Cost</label>
            </div>
            
            
            {/*                 <div className="responsiveForm">
            
            <div className="field">
            <input type="number" step="0.01" ref={this.productSalePrice} name="salePrice" id="salePrice" placeholder="$74.99" />
            <label htmlFor="salePrice">Sale Price</label>
            </div>   
            
            <div className="checkboxField">
            <input id="cbx" type="checkbox"/>
            <label className="cbx" htmlFor="cbx">
            <div className="flip">
            <div className="front"></div>
            <div className="back">
            <svg width="16" height="14" viewBox="0 0 16 14">
            <path d="M2 8.5L6 12.5L14 1.5"></path>
            </svg>
            </div>
            </div>
            </label>                
            <label className="checkboxFieldLabel" htmlFor="cbx">SPECIFY SALE DATES</label>
            </div>
            
        </div> */}
        {/*                 <div className="responsiveForm">
        
        <div className="field saleDate">
        <input type="date" ref={this.productSalePriceStart} name="salePriceStart" id="salePriceStart" placeholder="01/01/2020" />
        <label htmlFor="salePriceStart">Sale Price Starts</label>
        </div>
        
        <div className="field saleDate">
        <input type="date" ref={this.productSalePriceStart} name="salePriceEnd" id="salePriceEnd" placeholder="01/01/2020" />
        <label htmlFor="salePriceEnd">Sale Price Ends</label>
        </div>
        
    </div> */}
    </div>
    
    <h4 className="formSubHeader">GROUPING:</h4>
    
    <div className="responsiveFormContainer">
    <div className="responsiveForm">
    
    <div className="field">
    <input type="text" ref={this.category} name="category" id="category" placeholder="Lawn Care" defaultValue={p.category} />
    <label htmlFor="category">Category</label>
    </div>
    
    <div className="field">
    <input type="text" ref={this.subcategory} name="subcategory" id="subcategory" placeholder="Fertilizer" defaultValue={p.subcategory} />
    <label htmlFor="subcategory">Sub-Category</label>
    </div>
    
    </div>
    {/* <div className="responsiveForm">
    
    <div className="field">
    <input type="text" ref={this.department} name="department" id="department" placeholder="Landscaping" />
    <label htmlFor="department">Department</label>
    </div>
    
    <div className="field">
    <input type="text" ref={this.brand} name="brand" id="brand" placeholder="Scotts" />
    <label htmlFor="brand">Brand</label>
    </div>
    
</div> */}

<h4 className="formSubHeader">STOCK LEVEL:</h4>

<div className="responsiveFormContainer">
<div className="responsiveForm relative">

<div className="responsiveForm">

<div className="checkboxField">
<input onClick={this.showStockOptions} id="trackStockInput" type="checkbox" />
<label id="trackStockCheckbox" className="cbx" htmlFor="trackStockInput">
<div className="flip">
<div className="front"></div>
<div className="back">
<svg width="16" height="14" viewBox="0 0 16 14">
<path d="M2 8.5L6 12.5L14 1.5"></path>
</svg>
</div>
</div>
</label>                
<label className="checkboxFieldLabel" htmlFor="trackStockInput">Track Stock</label>
</div>

<div id="outOfStockField" className="checkboxField hidden">
<input onClick={() => {
    this.validateStock();
    this.focusOnStockLevel();
}} id="outOfStockInput" type="checkbox" />
<label id="outOfStockCheckbox" className="cbx" htmlFor="outOfStockInput">
<div className="flip">
<div className="front"></div>
<div className="back">
<svg width="16" height="14" viewBox="0 0 16 14">
<path d="M2 8.5L6 12.5L14 1.5"></path>
</svg>
</div>
</div>
</label>                
<label className="checkboxFieldLabel" htmlFor="outOfStockInput">Out of Stock</label>
</div>

</div>

<div id="stockLevelField" className="field hidden">
<input onChange={this.validateStock} type="number" step="1" ref={this.stockLevel} name="stockLevel" id="stockLevel" placeholder="100" defaultValue={p.stock_level} />
<label htmlFor="stockLevel">Stock Level</label>
</div>

<div id="outOfStockInputField" className="disabledField hidden">
<Tooltip style={{width: '100%'}}title='Stock level remains at 0 while item is marked "Out of Stock".  To enter stock, uncheck the "Out of Stock" checkbox.' position='top-start' id='stockLevelTooltip' >
<div className="field">
<input type="number" step="1" name="stockLevel" placeholder="100" id="stockLevelOOS" value="0" disabled />
<label htmlFor="stockLevelOOS">Stock Level</label>
</div>
</Tooltip>
</div>

<div id="stockErr" className="errorMessageCheckbox hidden">To track stock, please enter a stock level or choose "Out of stock".</div>
</div>
</div>

{/*                 <h4 className="formSubHeader">DESCRIPTION:</h4>
<div className="responsiveForm">

<div className="fieldFull">
<textarea rows="5" ref={this.description} name="description" id="description" placeholder="Enter a description..."></textarea>
</div>

</div>
<h4 className="formSubHeader">TAGS:</h4>
<div className="responsiveForm">

<div className="fieldFull">
<textarea rows="5" ref={this.tags} name="tags" id="tags" placeholder="Press ENTER after each tag..."></textarea>
</div>

</div> */}
</div>

<button className="newSave responsiveButton" type="button" onClick={this.validateForm}>Update Product</button>

</form>
))
}

</div>

);
}
}

export default withRouter(EditProduct);
