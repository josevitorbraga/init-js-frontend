import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';

import { ORDER_CREATE_RESET } from '../constants/orderConstants';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderPage(props) {
  const cart = useSelector(state => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }

  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  cart.itemsPrice = cart.cartItems
    .reduce((a, c) => a + c.qty * c.price, 0)
    .toFixed(2);
  // Seta o valor do frete, ALTERAR ISSO!!!!!!!!
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice);

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Envio</h2>
                <p>
                  <strong>Nome:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Endereço:</strong> {cart.shippingAddress.address},
                  <text> </text>
                  {cart.shippingAddress.city},<text> </text>
                  {cart.shippingAddress.postalCode},<text> </text>
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pagamento</h2>
                <p>
                  <strong>Forma de Pagamento:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Seu Pedido</h2>
                <ul>
                  {cart.cartItems.map(item => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            className="small"
                            src={`http://localhost:3333/${item.image}`}
                            alt={item.name}
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x R$ {item.price} = R${' '}
                          {(item.qty * item.price).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h1>Detalhes do pedido</h1>
              </li>
              <li>
                <div className="row">
                  <div>Valor</div>
                  <div>R${cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Envio</div>
                  <div>R${cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>TOTAL</strong>
                  </div>
                  <div>
                    <strong>R${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Realizar Pedido
                </button>
              </li>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
