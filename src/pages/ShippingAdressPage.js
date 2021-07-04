import axios from 'axios';
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
  const [contact, setContact] = useState(shippingAddress.country)
  const [number, setNumber] = useState(shippingAddress.number)

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, contact, address, number, city, postalCode, country }),
    );
    props.history.push('/payment');
    // dispatch save shipping adrs
  };

  const handleCepSearch = async(cep) => {
    const {data} = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    setAddress(data.logradouro)
    setCity(`${data.localidade}, ${data.uf}`)
    setCountry("Brasil")
  }

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Endereço para envio</h1>
        </div>
        <div>
          <label htmlFor="fullName"><strong>Nome completo do destinatário</strong></label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Nome completo"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contact"><strong>Celular</strong></label>
          <input
            maxLength='11'
            type="text"
            name="contact"
            id="contact"
            placeholder="Numero para contato"
            onChange={e => setContact(e.target.value)}
            value={contact}
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode"><strong>CEP</strong></label>
          <input
          aria-describedby="cep-help"
            maxLength='8'
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder="CEP"
            value={postalCode}
            onBlur={e => handleCepSearch(e.target.value)}
            onChange={e => setPostalCode(e.target.value)}
            required
          />
          <div id='cep-help'>
          <text
            style={{ color: 'grey', fontSize: '1.3rem', marginBottom: '3rem' }}
          >Digite o cep de destino sem hífen</text>
          </div>
        </div>
        <div style={{flexDirection:'row'}}>
          <div style={{display:'flex', flexDirection: 'column'}}> 
            <label htmlFor="address"><strong>Endereço</strong></label>
            <input
            disabled
            style={{width: '42rem'}}
              type="text"
              name="address"
              id="address"
              placeholder="Endereço de envio"
              value={address}
              on
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>
          <div style={{display:'flex', flexDirection:'column', marginLeft: '2rem'}}>
            <label htmlFor="address"><strong>Número</strong></label>
            <input
              style={{width: '9.5rem'}}
              type="text"
              name="number"
              id="address"
              placeholder="N°"
              value={number}
              onChange={e => setNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="city"><strong>Cidade</strong></label>
          <input
          disabled
            type="text"
            name="city"
            id="city"
            placeholder="Cidade"
            value={city}
            on
            onChange={e => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="country"><strong>Pais</strong></label>
          <input
          disabled
            type="text"
            name="country"
            id="country"
            placeholder="País"
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
