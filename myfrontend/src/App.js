import React, {Component} from 'react';
import './App.css';
import {Services} from './Services';
import CartItem from './CartItem';

var services = new Services();

class App extends Component {
  constructor(){
    super();
    this.state = {
        productlist: [],
        showProductListPage: true,
        showCheckoutPage: false
    }
  }

  componentDidMount = () => {
    services.getproductlist(data => {
      if (data.status === "failed") {
        console.log("Data not found")
      }
      else {
        this.setState({
          productlist : data.productlist
        });
        console.log("Good")
      }
    }) 
  };

  togglePage = () => {
    this.setState({
      showProductListPage: !this.state.showProductListPage,
      showCheckoutPage: !this.state.showCheckoutPage,
    })
    var shoppingCartList = this.state.productlist.filter(item => item.count > 0);
  }

  render(){
    return(
      <div className="App">
        <h1>Bestest Buy</h1>
        {this.state.showProductListPage &&
        <div>
          {this.state.productlist.map((value, index) => (<CartItem data={value}/>))}
          <button onClick={this.togglePage}>Checkout</button>
        </div>}
        {this.state.showCheckoutPage &&
        <div>
          
          <button onClick={this.togglePage}>Back to Products</button>
        </div>}
        


      </div>)
  }
}


export default App;
