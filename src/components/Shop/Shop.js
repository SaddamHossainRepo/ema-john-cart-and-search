import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDb, deleteShoppingCart, getStoredCart} from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    // const [products, setProducts] = useState([]);
    const products = useLoaderData();
    const [cart, setCart] = useState([]);

    const clearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    // useEffect( () =>{
    //     console.log('products load before fetch');
    //     fetch('products.json')
    //     .then(res=> res.json())
    //     .then(data => 
    //         setProducts(data));
    //         console.log('products loaded');
    // }, []);

    useEffect(()=>{
        console.log('local storage first line', products);
        const storedCart = getStoredCart();
        const savedCart = [];
        console.log(storedCart);
        for(const id in storedCart){
            const addedProduct = products.find(product=> product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
            // console.log(addedProduct);
        }
        setCart(savedCart);
        console.log('local storage finished');
    },[products])

    const handleAddToCart = (product) =>{
        // console.log(product);
        // do not do this: cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to="/orders">
                        <button>Review Order</button>
                    </Link>
                </Cart>
                
            </div>
        </div>
    );
};

export default Shop;