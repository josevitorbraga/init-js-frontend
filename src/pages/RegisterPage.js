import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterPage(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas devem coincindir');
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Criar nova conta</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Qual o seu nome?"
            required
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Endereço de email</label>
          <input
            type="email"
            id="email"
            placeholder="Entre com seu email"
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Escolha uma senha"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirme a senha</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme a senha"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Criar conta
          </button>
        </div>
        <div>
          <label />
          <div>
            Já possui conta? {'  '}
            <Link to={`/signin?redirect=${redirect}`}>Criar conta</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
