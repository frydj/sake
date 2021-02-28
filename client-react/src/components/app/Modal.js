import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../App.css';

class Modal extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      navigation: "standard",
      objectType: "Product"
    };
  }
  
  componentDidMount() {
      // console.log("modal mounted bruv")
  }
  
  showProductsModal = (e) => {
    let productsModal = document.getElementById("productsModal");
    let productsModalContent = document.getElementById("productsModalContent");
    let productSearch = document.getElementById("productSearch");
    if (productsModal.className === "modalBackground") {
        productsModal.className = "modalBackgroundHide";
        productsModalContent.className = "modalContentHide";
        setTimeout(() => {
            productsModal.className = "hidden";
            // console.log('modal is now HIDDEN');
        }, 500);
    } else {
        productsModalContent.className = "modalContent";
        productsModal.className = "modalBackground";
        productSearch.focus();
        // console.log("should be focused");
    }
};

  render() {
    return (
      <div className="modalBackground" id="modalBackground">
            <div className="modalContent" draggable="true">
                <div className="modalHeader">
                    <div className="modalHeaderText">{this.props.title}</div>
                    <div className="exitModal" onClick={this.props.closeModal} ></div>
                </div>
                <div className="modalBody">
                    <div className="title">Title</div>
                    <div className="sku">SKU</div>
                    <div className="priceQtyContainer">
                        <div className="priceContainer">
                            <div className="priceValue"><input id="price" type="text" defaultValue="$12.99"></input></div>
                        </div>
                        <div className="times"></div>
                        <div className="quantityContainer">
                            <div className="qtyDecrement"></div>
                            <div className="qtyValue"><input id="qty" type="text" defaultValue="3"></input></div>
                            <div className="qtyIncrement"></div>
                        </div>
                    </div>
                    <div className="discountContainer">
                        <div className="addDiscount">Add Discount</div>
                    </div>
                    <div className="notesContainer">
                        <textarea placeholder="Enter a note..."></textarea>
                    </div>
                    <button className="cancel red" type="button">Cancel</button>
                    <button className="saveOrder green" type="button">Save {this.state.objectType}</button>
                </div>
            </div>
      </div>
      );
    }
  }
  export default withRouter(Modal);
  