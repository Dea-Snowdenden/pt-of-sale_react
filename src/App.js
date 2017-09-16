import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

class Product extends Component {
 constructor(props) {
   super(props);
   this.state = {qty:0};
   this.buy = this.buy.bind(this);
   this.show =this.show.bind(this);
   this.bawas =this.bawas.bind(this);
 }


 buy(){
   this.setState({qty: this.state.qty + 1});
   this.props.handleTotal(this.props.price);
 }


 show(){
   this.props.handleShow(this.props.name);
 }

 bawas() {
  this.setState({qty: this.state.qty - 1});
  this.props.handleTotal(-this.props.price);
 }
 render() {
   return (
     <div>
       <div className="container-fluid" id="header1">
          <div class="row">
                <p> {this.props.name} = ${this.props.price}</p>
                <button onClick={this.buy}>+</button>
                <button onClick={this.show}>Show</button>
                <button onClick={this.bawas}>-</button>
                <h3>${this.state.qty*this.props.price}</h3>
          </div>
                <hr/>
        </div>
      </div>
   );
 }
}

class Total extends Component {
 render() {
   return (
     <div className="container" id="total1">
     <div>
       <h3>Total balance: ${this.props.total} </h3>
     </div>
     </div>
     )
 }
}

class ProductForm extends Component {
 constructor(props) {
   super(props);
   this.submit = this.submit.bind(this);
 }

 submit(e) {
    e.preventDefault();
    var product = {
     name: this.refs.name.value,
     price: parseInt(this.refs.price.value)
   };
   this.props.handleCreate(product);
   alert(product.name + "has been added");
   this.refs.name.value="";
   this.refs.price.value="";
 }

 render() {
   return(
     <div className="container" id="top">
       <h1> React Flower Shop </h1>
     <form onSubmit={this.submit}>
     <input type="text" placeholder="Prod Name" ref="name"/>
     <input type="text" placeholder="Prod Price" ref="price"/>
     <br/>
     <button>Create Product</button>
     </form>
     </div>
   );
 }
}

class ProductList extends Component {
  constructor(props) {
  super(props);
  this.state={total:0,
      productList:
  [{name: "Roses with cacti", price: 50, image: require("./img/roseswithcac.jpg")},
  {name: "Multi Rose Silve Bouquet", price: 65, image: require("./img/multirosesilver.jpg")},
  {name: "Long-stemmed Roses", price: 80, image: require("./img/roses.jpg")},
  {name: "Sunset Rose", price: 90, image: require("./img/sunsetrose.jpg")},
  {name: "Hot Pink Mix", price: 40, image: require("./img/royalpurple.jpg")},
  {name: "Plush Orchid", price: 120, image: require("./img/plushorchid.jpg")},
  {name: "Royal Purple", price: 130, image: require("./img/royalpurple.jpg")},
  {name: "Stargazer", price: 77, image: require("./img/stargazer.jpg")},
  {name: "Orchids", price: 111, image: require("./img/orchids.jpg")},
  {name: "Tulips", price: 155, image: require("./img/tulip.jpg")}]
  };
  this.calcTotal = this.calcTotal.bind(this);
  this.createProduct = this.createProduct.bind(this);
  }

  calcTotal(price) {
  this.setState({total: this.state.total + price})
  }


showProduct(name){
 alert("You are buying " +name);
}  

createProduct(product) {
 this.setState({
   productList: this.state.productList.concat(product)
 });
}

 render(){
   var component = this;
   var products = this.state.productList.map(function(prod){
     return(
       <div>
         <img src={prod.image} className="image-box img-responsive"/>
       <Product name={prod.name} price={prod.price}
         handleShow={component.showProduct}
         handleTotal={component.calcTotal}/>
       </div>
     );
   });
   return(
   <div>
     <div className="box" id="box1">
       <div>
     <ProductForm handleCreate={this.createProduct}/>
     {products}
     <Total total={this.state.total}/>
     </div>
      </div>
   </div>
   )
 }
}

export default ProductList;