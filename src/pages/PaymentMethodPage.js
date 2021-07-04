import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

import CheckoutSteps from '../components/CheckoutSteps';

import mpLogo from '../assets/mercado-pago-logo.svg'

export default function PaymentMethodPage(props) {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Forma de pagamento</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="mercadopago"
              value="mercadopago"
              name="paymentMethod"
              required
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="mercadopago">Mercado Pago <img className='small' src={mpLogo} alt="mercadopago" /></label>
          </div>
        </div>
        <button style={{marginTop: '2rem'}} className="primary" type="submit">Continuar</button>
      </form>
    </div>
  );
}
