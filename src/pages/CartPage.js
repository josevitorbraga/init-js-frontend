import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCArt, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartPage(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCArt(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };
  const backToShop = () => {
    props.history.push("/")
  }
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <>
      <h1 className="title">SEU CARRINHO</h1>

      <div className="row top">
        <div className="col-2">
          {cartItems.length === 0 ? (
            <MessageBox>
              Parece que você ainda não adicionou produtos aqui,{' '}
              <Link to="/">
                <strong>vamos comprar!</strong>
              </Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map(item => (
                <li key={item.product}>
                  <div className="cart-row">
                    <div>
                      <img
                        className="small"
                        src={`http://localhost:3333/${item.image}`}
                        alt={item.name}
                      />
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={e =>
                          dispatch(
                            addToCArt(item.product, Number(e.target.value)),
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>R$ {item.price}</div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1" style={{ marginLeft: '9rem' }}>
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Valor para ({cartItems.reduce((a, c) => a + c.qty, 0)}{' '}
                  produtos): R$
                  {cartItems
                    .reduce((a, c) => a + c.price * c.qty, 0)
                    .toFixed(2)}
                </h2>
              </li>
              <li>
                <button type='button' className="secondary block" onClick={backToShop}><i className="fa fa-arrow-left"/>&nbsp;&nbsp;Continuar comprando</button>
                <button
                  className="primary block"
                  type="button"
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                >
                  Finalizar pedido&nbsp;&nbsp;<i className="fa fa-shopping-cart"/>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
