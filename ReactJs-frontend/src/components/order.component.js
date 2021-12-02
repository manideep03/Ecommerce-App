import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import AuthService from "../services/auth.service";


export default class Orders extends Component {
  constructor(props) {
    super(props);
 
    this.retrieveOrders= this.retrieveOrders.bind(this);
    this.refreshList = this.refreshList.bind(this);
    
   

    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  

  }

  changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}


  retrieveOrders() {
    ProductDataService.getOrders()
      .then(response => {
        this.setState({
          orders: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  refreshList() {
    this.retrieveOrders();
    
  }



  render() {
    const { orders} = this.state;

    return (
      <div className="jumbotron">
          <div className="list row">
              <div className="col-md-8">
              </div>
              <div className="col-md-6">
                <h4>Your Orders List</h4>
              </div>
              <div className="col-md-6">
                <ul className="list-group">
                
                  {orders && orders.map((orders, index) => (
                    <li className={"list-group-item "} key={index} >
                    
                      <div className='container'>
                          <p>order id: {orders.id}</p>
                          
                          <h4>price ${orders.product.price}</h4>
                          <h4>item quantity: {orders.quantity}</h4>
                          <h4>item total ${orders.total}</h4>
                          <p>product id : {orders.product.id}</p>
                      </div>
                    
                  </li>
                  
                  ))}
              
                </ul>
              </div>
            </div>

      </div>
    );
  }
}
