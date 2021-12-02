import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";

import ProductDataService from "../services/product.service";


const user = AuthService.getCurrentUser();

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const vname = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vdescription = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
};

const vcategory = value => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vprice = value => {
    if (value.length < 2 || value.length > 10) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
};

export default class addProduct extends Component {
  constructor(props) {
    super(props);
    this.addProduct = this.addProduct.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription= this.onChangeDescription.bind(this);
    this.onChangeImglink = this.onChangeImglink.bind(this);

    this.state = {
      name: "",  
      description: "",
      price:0,
      category:"",
      imglink:""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeImglink(e) {
    this.setState({
      imglink: e.target.value
    });
  }

  addProduct(e) {
    e.preventDefault();
    

    this.form.validateAll();

    var data = {
        name:this.state.name,
        category:this.state.category,
        price:this.state.price,
        description:this.state.description,
        imglink:this.state.imglink
    }

    if (this.checkBtn.context._errors.length === 0) {
      ProductDataService.addProduct(data).then(
        response => {
            this.setState({
                name:response.data.name,
                category:response.data.category,
                price:response.data.price,
                description:response.data.description,
                imglink:response.data.imglink
            })        
            console.log(response);
            this.props.history.push("/addProduct");
            window.location.reload();   
        },
      );
    }
  }

  render() {
    const userrole = user.roles;
    if(userrole == "ROLE_USER"){
      return <p>Must be a seller or admin to add products</p>
    }
    else{
    return (

      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.addProduct}
            ref={c => {
              this.form = c;
            }}
          >
              <div>
                <div className="form-group">
                  <label htmlFor="name">name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="category"
                    value={this.state.category}
                    onChange={this.onChangeCategory}
                    validations={[required, vcategory]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Input
                    type="price"
                    className="form-control"
                    name="price"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    validations={[required, vprice]}
                  />
                </div>



                <div className="form-group">
                  <label htmlFor="description">description</label>
                  <Input
                    type="description"
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    validations={[required, vdescription]}
                    
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imglink">Image Link</label>
                  <Input
                    type="imglink"
                    className="form-control"
                    name="imglink"
                    value={this.state.imglink}
                    onChange={this.onChangeImglink}
                    
                    
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">add Product</button>
                </div>
              </div>

              <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            
          </Form>
        </div>
      </div>
    );
  }
}
}
