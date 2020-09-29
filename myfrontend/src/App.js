import React, {Component} from 'react';
import './App.css';
import {Services} from './Services';

var services = new Services();

class App extends Component {
  constructor(){
    super();
    this.state = {
        productlist: []
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

  render(){
    return(
      <div className="App">
        Hello World!
        
      </div>)
  }
}


export default App;
