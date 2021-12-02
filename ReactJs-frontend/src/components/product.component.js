import React, { Component } from "react";
import ProductDataService from "../services/product.service";


export default class Products extends Component {
  constructor(props) {
    super(props);
 
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.refreshList = this.refreshList.bind(this);
   

    this.state = {
      products: [],
      currentIndex: -1,
      currentProduct:null,
      id:null,
      qt:null,
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }


  retrieveProducts() {
    ProductDataService.getAll()
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  addToCart(id,qt) {
    ProductDataService.addToCart(id,qt)
      .then(response => {
        
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  refreshList() {
    this.retrieveProducts();
    this.setState({
      currentIndex: -1,
      currentProduct:null
    });
  }



  render() {
    const { products,currentProduct} = this.state;

    return (
      <div className="list col">
        <div className="col-md-4">
        </div>
        <div className="col-md-4">
          <h4>Products List</h4>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {products && products.map((products, index) => (
            <li className={"list-group-item "} key={index} >
              
                <div className='container'>
                    <br></br>
                    <img  src={products.imglink} alt="boohoo" class="img-fluid"/>
                    <h3>{products.name}</h3>
                    <br></br>
                    <h4>Rs. {products.price}</h4>
                    <p> {products.description}</p>
                    
                    <button className= "btn btn-primary btn-block" onClick = {() => this.addToCart(`${products.id}`,`${1}`)}>Add To Cart</button>
            
                </div>
 
            </li>
             ))}
          </ul>
        </div>
      </div>
    );
  }
}
