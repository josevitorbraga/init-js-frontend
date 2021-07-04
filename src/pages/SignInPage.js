import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { signIn } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SignInPage(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userSignin = useSelector(state => state.userSignIn);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault(dispatch(signIn(email, password)));
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
          <h1>Fazer login</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">Email ou senha inválidos!</MessageBox>}
        <div>
          <label htmlFor="email">Endereço de e-mail</label>
          <input
            type="email"
            id="email"
            placeholder="exemplo@seuemail.com"
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Insira sua senha"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Entrar
          </button>
        </div>
        <div>
          <label />
          <div>
            Novo na loja? {'  '}
            <Link to={`/register?redirect=${redirect}`}>Criar conta</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
