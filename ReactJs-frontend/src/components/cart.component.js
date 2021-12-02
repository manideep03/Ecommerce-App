import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import AuthService from "../services/auth.service";


export default class Cart extends Component {
  constructor(props) {
    super(props);
 
    this.retrieveCart= this.retrieveCart.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.addOrder = this.addOrder.bind(this);
    
   

    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.retrieveCart();
  

  }

  changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}


  retrieveCart() {
    ProductDataService.getByid()
      .then(response => {
        this.setState({
          cart: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  addOrder(e) {
    e.preventDefault();

    ProductDataService.addOrder()
    .then(response => {
      console.log(response.data);
      this.props.history.push("/cart");
      window.location.reload();
    })
    .catch(e => {
      console.log(e);
    });
     
  }
  deleteCart(id) {
    ProductDataService.deleteCart(id)
      .then(response => {
        this.props.history.push("/cart");
        window.location.reload();
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCart();
    
  }



  render() {
    const { cart} = this.state;

    return (

      <div className="jumbotron">
      <div className="list row">
        <div className="col-md-8">
        </div>
        <div className="col-md-6">
          <h4>CART List</h4>
        </div>
        <div className="col-md-6">
          <ul className="list-group">
           
            {cart && cart.map((cart, index) => (
              <li className={"list-group-item "} key={index} >
              
                <div className='container'>
                    <h3>irem quantity: {cart.quantity}</h3>
                    <h4>item total ${cart.total}</h4>
                    <p>product id : {cart.product.id}</p>
                    <button className= "btn btn-danger btn-block" onClick = {() => this.deleteCart(`${cart.id}`)}>Delete cart</button>
                </div>
              
            </li>
            
            ))}
        

            {cart.length!=0 ?  <button className= "btn btn-primary btn-block"  onClick={this.addOrder}> place order </button>
            
            :(<div> <h1 >cart is empty!!!</h1></div>)}
             
            
              
          </ul>
        </div>
      </div>
      </div>
    );
  }
}
