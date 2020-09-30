import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';
import {Services} from './Services';
import CartItem from './CartItem';


var services = new Services();

class App extends Component {
  constructor(){
    super();
    this.state = {
        productlist: [],
        shoppingCartList: [],
        showProductListPage: true,
        showCheckoutPage: false,
        total: {"subtotal": 0, "tax": 0, "linetotal": 0, "yousave": 0},
        username: ""
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

    var result = this.calculate(0.0);
    this.setState({
      shoppingCartList: result.shoppingList,
      total: result.totalList
    })
  }

  calculate = (discount) => {
    var totalList = {"subtotal": 0, "tax": 0, "linetotal": 0, "yousave": 0}
    var shoppingList = this.state.productlist.filter(item => item.count > 0)

    shoppingList.map((item) => {
      item.yousave = item.price * item.count * discount;
      item.subtotal = item.price * item.count * (1 - discount);
      item.tax = item.subtotal * 0.13;
      item.linetotal = item.subtotal + item.tax;
      
      totalList.yousave += item.yousave;
      totalList.subtotal += item.subtotal;
      totalList.tax += item.tax;
      totalList.linetotal += item.linetotal;
    })

    return {totalList, shoppingList}
    
  }
  
  handleDiscountAll = () => {
    var result = this.calculate(0.5);
    this.setState({
      shoppingCartList: result.shoppingList,
      total: result.totalList
    })
  }

  finishOrder = () => {
    var userOrder = {
      username: this.state.username,
      shoppingCartList: this.state.shoppingCartList,
      total: this.state.total
    };

    services.saveuserorder(userOrder, data => {
      if (data.status === "failed") {
        console.log("Data not found");
      }
      else {
        this.setState({
          showProductListPage: !this.state.showProductListPage,
          showCheckoutPage: !this.state.showCheckoutPage,
        });
        console.log("Good");
      }
    }) 

  }

  handleUsernameChange = (event) => {
    this.setState({"username": event.target.value});
  }

  render(){
    return(
      <div className="App">
        <h1>Bestest Buy</h1>
        {this.state.showProductListPage &&
        <div>
          <label>Please enter your username: </label>
          <input type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
          {this.state.productlist.map((value, index) => (<CartItem data={value}/>))}
          <button onClick={this.togglePage}>Checkout</button>
        </div>}
        {this.state.showCheckoutPage && <div>
        <button onClick={this.handleDiscountAll}>Add 50% Discount to all items</button>
        <div><label>Username: {this.state.username}</label></div>
        
        <TableContainer component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">Line Total</TableCell>
              <TableCell align="right">You Save</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.shoppingCartList.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">${row.subtotal}</TableCell>
                <TableCell align="right">${row.tax}</TableCell>
                <TableCell align="right">${row.linetotal}</TableCell>
                <TableCell align="right">${row.yousave}</TableCell>
              </TableRow>
            ))}
            <TableRow>
                <TableCell component="th" scope="row">
                 Total
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">${this.state.total.subtotal}</TableCell>
                <TableCell align="right">${this.state.total.tax}</TableCell>
                <TableCell align="right">${this.state.total.linetotal}</TableCell>
                <TableCell align="right">${this.state.total.yousave}</TableCell>
              </TableRow>
          </TableBody>
          
        </TableContainer>
          <button onClick={this.togglePage}>Back to Products</button>
          <button onClick={this.finishOrder}>Finish Order</button>
        </div>}
        
      </div>)
  }
}


export default App;
