import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAdressPage(props) {
  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country }),
    );
    props.history.push('/payment');
    // dispatch save shipping adrs
  };
  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Endereço para envio</h1>
        </div>
        <div>
          <label htmlFor="fullName">Nome completo do destinatário</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Nome completo"
            value={fullName}
            on
            onChange={e => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Nome completo"
            value={address}
            on
            onChange={e => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Nome completo"
            value={city}
            on
            onChange={e => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode">CEP</label>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder="Nome completo"
            value={postalCode}
            on
            onChange={e => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="country">Pais</label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Nome completo"
            value={country}
            on
            onChange={e => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
