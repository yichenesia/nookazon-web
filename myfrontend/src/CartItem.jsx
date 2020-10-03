import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
        <Card style={{ width: '15rem' }}>
        
        <Card.Body className="justify-content-center">
            <Card.Title className="card-body text-center"><h1>{this.props.data.name}</h1></Card.Title>
            <Card.Img variant="top" src={require(`${this.props.data.img}`)} />
            <Card.Text>
                Price: ${this.props.data.price}
                
            </Card.Text>
            <Card.Text>
                Number in Cart: {this.state.numInCart}
            </Card.Text>
            <Button className="addToCart" onClick={this.addToCart}>Add to Cart</Button>
            <Button className="removeFromCart" onClick={this.removeFromCart}>Remove from Cart</Button>
        </Card.Body>
        </Card>


        /*{ <div className="note">
            <h1 className="itemname">{this.props.data.name}</h1>
            <div>
                <img className="one" src={require(`${this.props.data.img}`)} alt={this.props.data.name} height="5%"/>
            </div>
            <p className="price">Price: ${this.props.data.price}</p>
            <p className="amount">Number in Cart: {this.state.numInCart}</p>
            <Button className="addToCart" onClick={this.addToCart}>Add to Cart</Button>
            <Button className="removeFromCart" onClick={this.removeFromCart}>Remove from Cart</Button>
        </div> }*/

    );}
}

export default CartItem;