import React, {Component} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';
import {Services} from './Services';
import CartItem from './CartItem';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';


var services = new Services();

const ColoredLine = ({ color, height }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: height
      }}
  />
);

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
        <div><header><h1 className="header">NOOKAZON</h1></header></div>
        {this.state.showProductListPage &&
        <div>
          <div className="relative"><label><h2>Please enter your username: </h2></label></div>
          
          <input type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
          <Container>
          <ColoredLine color="blue" height="5"/>
          <Row>
            {this.state.productlist.map((value, index) => (<Col class="sm md={4}"><CartItem data={value} /></Col>))}
          </Row>
          </Container>
          <Button variant="warning" onClick={this.togglePage}>Checkout</Button>
        </div>}

        {this.state.showCheckoutPage && <div>
        <button className="discount" onClick={this.handleDiscountAll}>Add 50% Discount to all items</button>
        <div><label><h2>Username: {this.state.username}</h2></label></div>
        
        <Container>
        <TableContainer component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell><span className="font-weight-bold">Product Name</span></TableCell>
              <TableCell align="center"><span className="font-weight-bold">Price</span></TableCell>
              <TableCell align="center"><span className="font-weight-bold">Amount</span></TableCell>
              <TableCell align="center"><span className="font-weight-bold">Subtotal</span></TableCell>
              <TableCell align="center"><span className="font-weight-bold">Tax</span></TableCell>
              <TableCell align="center"><span className="font-weight-bold">Line Total</span></TableCell>
              <TableCell align="center"><span className="font-weight-bold">You Save</span></TableCell>
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
                <span className="font-weight-bold">Total</span>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"><span className="font-weight-bold">${this.state.total.subtotal}</span></TableCell>
                <TableCell align="right"><span className="font-weight-bold">${this.state.total.tax}</span></TableCell>
                <TableCell align="right"><span className="font-weight-bold">${this.state.total.linetotal}</span></TableCell>
                <TableCell align="right"><span className="font-weight-bold">${this.state.total.yousave}</span></TableCell>
              </TableRow>
          </TableBody>
          
        </TableContainer>
        </Container>
          <Button variant="primary" onClick={this.togglePage}>Back to Products</Button>
          <Button variant="secondary" onClick={this.finishOrder}>Finish Order</Button>
        </div>
        }
        
      </div>)
  }
}


export default App;
