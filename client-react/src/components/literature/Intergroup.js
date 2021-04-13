import React from "react";
import Barcode from "react-barcode";
import axios from "axios";



class Intergroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    let url = "/aaliterature";
    axios.get(url).then(response => this.setState({
      books: response.data
    }))
  }

  render() {
    return (
      <div className="literatureContainer">
        <div className="literatureInner">
          {this.state.books.map(p => (
            <div key={p.id} className="labelOuter">
              <div className="labelInner">

                <div className="price">${p.price}</div>

                <div className="mainDesc">{p.mainDesc}</div>
                <div className="secondaryDesc">{p.secondaryDesc}</div>

                <div className="codes">
                  <Barcode value={p.upc.toString()} height={45} textAlign="left" />
                  <div className="sku">{p.sku}{p.sortOrder}</div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }
}

export default Intergroup;
