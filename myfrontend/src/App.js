import React, {Component} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Services} from './Services';
import CartItem from './CartItem';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        console.log("Data compiled and page switched");
      }
    }) 

  }

  handleUsernameChange = (event) => {
    this.setState({"username": event.target.value});
  }

  render(){
    return(
      <div className="App">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={12}>
              <div><header><h1>NOOKAZON</h1></header></div>
            </Col>
          </Row>
          {this.state.showProductListPage &&
          <div><Row >
              <div className="relative"><h2>Please enter your username: </h2></div>
            
              <input type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
            </Row>
            <Row className="justify-content-center">{this.state.productlist.map((value, index) => (<Col xs={12} md={6}><CartItem data={value}/></Col>))}</Row>
              
            <Row><button className="submit" onClick={this.togglePage}>Checkout</button></Row></div>   
          }
          
          <Row>
            
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
        </Container>

        
        {this.state.showProductListPage &&
        <div>
          <div className="relative"><label><h2>Please enter your username: </h2></label></div>
          
          <input type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
          {this.state.productlist.map((value, index) => (<CartItem data={value}/>))}

          <button className="submit" onClick={this.togglePage}>Checkout</button>
        </div>}

        {this.state.showCheckoutPage && <div>
        <button className="discount" onClick={this.handleDiscountAll}>Add 50% Discount to all items</button>
        <div><label><h2>Username: {this.state.username}</h2></label></div>
        
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
          <button className="back" onClick={this.togglePage}>Back to Products</button>
          <button className="submit2" onClick={this.finishOrder}>Finish Order</button>
        </div>}
        
      </div>)
  }
}


export default App;
