import './App.css';
import Book from './Book';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [CartData, setCart] = useState([]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      setCart(cart)
    }
  }, [cart]);

  const Checkout = () => {
    console.log('Cart data', CartData)
    return (
      CartData && CartData.length > 0 &&
      <div className='row' style={{ borderStyle: '2px solid white' }}>
        {
          CartData.map((data) => {
            return (<div key={data.isbn} className='col-lg-3 col-md-3'>
              <h4>Title : {data.title} </h4>
              <h5> Price : {data.price}</h5>
              <h5> ISBN : {data.isbn}</h5>
            </div>)
          })
        }
        <button className='btn btn-success'>Checkout </button>
      </div>
    );
  }

  useEffect(() => {
    const URL = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json'
    fetch(URL)
      .then(res => res.json())
      .then(
        (result) => {
          console.info('result is', result.length)
          dispatch({ type: 'SET_DATA', payload: result });
          dispatch({ type: 'SET_SESSION_BOOKS', payload: result.slice(0, 25) });
        },
        (error) => {
          console.error('Error :', error)
        }
      )
  },
    []);

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <header className="App-header">
        <div style={{ width: '100%' }}>
          <div style={{ width: '55  %', float: 'left', textAlign: 'right' }}>  Book Store</div>
          <div style={{ textAlign: 'right' }}>  Cart : {CartData.length}  </div>
          <Checkout />
        </div>
      </header>
      <Book />
    </div>
  );
}

export default App;
