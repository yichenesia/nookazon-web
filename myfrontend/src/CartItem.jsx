import React, { Component } from 'react';

class CartItem extends Component {
    constructor(props){
        super(props);
        this.state={
            numInCart: 0,
        };
        // this.removeFromCart = this.removeFromCart.bind(this);
    }


    addToCart = () => {
        this.setState({numInCart: this.state.numInCart + 1})
    

        // this.props.data.count++;
        
        
    }

    
    removeFromCart = () => {
        this.setState({numInCart: this.state.numInCart - 1})
        // this.props.data.count--;
        
    }

    render(){
    return (
        <div>
            <h1>{this.props.data.name}</h1>
            <div>
                <img className="one" src={require(`${this.props.data.img}`)} alt={this.props.data.name} height="5%"/>
            </div>
            <p>${this.props.data.price}</p>
            <p>Number in Cart: {this.state.numInCart}</p>
            <button onClick={this.addToCart}>Add to Cart</button>
            <button onClick={this.removeFromCart}>Remove from Cart</button>
        </div>

    );}
}

export default CartItem;