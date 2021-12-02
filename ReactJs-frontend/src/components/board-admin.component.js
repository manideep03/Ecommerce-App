import React, { Component } from "react";
import  { Redirect } from 'react-router-dom'
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.addProduct = this.addProduct.bind(this);

    this.state = {
      content: ""
    };
  }


  addProduct() {
    
    this.props.history.push("/addProduct");
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
          <button className= "btn btn-primary btn-block" onClick={this.addProduct} >addProduct</button>
        </header>
      </div>
    );
  }
}
