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
    

        this.props.data.count++;
        
        
    }

    
    removeFromCart = () => {
        if (this.state.numInCart > 0){
        this.setState({numInCart: this.state.numInCart - 1})
        this.props.data.count--;
        }
    }

    render(){
    return (
        <div className="note">
            <h1 className="itemname">{this.props.data.name}</h1>
            <div>
                <img className="one" src={require(`${this.props.data.img}`)} alt={this.props.data.name} height="5%"/>
            </div>
            <p className="price">Price: ${this.props.data.price}</p>
            <p className="amount">Number in Cart: {this.state.numInCart}</p>
            <button className="addToCart" onClick={this.addToCart}>Add to Cart</button>
            <button className="removeFromCart" onClick={this.removeFromCart}>Remove from Cart</button>
        </div>

    );}
}

export default CartItem;