import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const { cart, clearCart, children } = props;

    let total = 0;
    let shipping = 0;
    for(const product of cart){
        total = total + product.price;
        shipping = shipping + product.shipping;
    }
    const tax = total * 0.1;
    const grandTotal = total+shipping+tax;
    // console.log(typeof(grandTotal));
    return (
        <div className='cart'>
            <h4>Order Summary in Cart</h4>
            <p>Selected Items: {cart.length}</p>
            <p>Total price: ${total}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
            <button onClick={clearCart}>Clear Cart</button>
            {children}
        </div>
    );
};

export default Cart;