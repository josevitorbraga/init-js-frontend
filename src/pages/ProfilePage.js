import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user]);

  const submitHandler = e => {
    e.preventDefault();
    // TODO DISPATCH
    if (password !== confirmPassword) {
      alert('As senhas devem coincindir');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
        }),
      );
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div className>
          <h1>Meu Perfil</h1>
          <text
            style={{ color: 'grey', fontSize: '1.3rem', marginBottom: '3rem' }}
          >
            Caso queira alterar as informações de login utilize os campos
            abaixo:
          </text>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Perfil alterado com sucesso
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">
                <strong>Nome</strong>
              </label>
              <input
                type="text"
                placeholder="Qual o seu nome?"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="text"
                placeholder="Entre com seu email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">
                <strong>Senha</strong>
              </label>
              <input
                type="text"
                placeholder="Escolha uma senha"
                id="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmpassword">
                <strong>Confirme a senha</strong>
              </label>
              <input
                type="text"
                placeholder="Confirme a senha"
                id="confirmpassword"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Atualizar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
