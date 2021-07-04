import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signOut } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderListPage from './pages/OrderListPage';
import SearchPage from './pages/SearchPage'
import OrderPage from './pages/OrderPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProductEditPage from './pages/ProductEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ShippingAdressPage from './pages/ShippingAdressPage';
import SignInPage from './pages/SignInPage';

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector(state => state.userSignIn);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signOut());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div style={{marginLeft: '2rem'}}>
            <Link className="brand" to="/">
              SITE NAME
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}/>
              )}
            />
          </div>
          <div style={{marginRight: '2rem'}}>
            <Link to="/cart">
            <i className="fa fa-shopping-cart" /> &nbsp;CARRINHO
              {cartItems.length > 0 && (
                <span className="badge">
                  <strong>{cartItems.length}&nbsp;</strong>
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="dropdown">
                <Link to="/profile">
                <i className="fa fa-user" /> &nbsp;{userInfo.name.toUpperCase()} <i className="fa fa-caret-down" />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile"><i className="fa fa-edit" />  Alterar credenciais</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory"><i className="fa fa-shopping-bag" />  Meus Pedidos</Link>
                  </li>
                  <li>
                    <Link to="/#logout" onClick={signoutHandler}>
                    <i className="fa fa-sign-out" />  Sair
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">LOGIN</Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                <i className="fa fa-cogs" />  &nbsp;ADMIN <i className="fa fa-caret-down" />
                </Link>
                <ul style={{textAlign: "right", minWidth:'13rem'}} className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productList"><i className="fa fa-tags" />   Produtos</Link>
                  </li>
                  <li>
                    <Link to="/orderList"><i className="fa fa-truck" />   Pedidos</Link>
                  </li>

                </ul>
              </div>
            )}

            
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/products/:id" component={ProductPage} exact />
          <Route path="/product/:id/edit" component={ProductEditPage} exact />
          <Route path="/register" component={RegisterPage} />
          <Route path="/signin" component={SignInPage} />
          <Route path="/shipping" component={ShippingAdressPage} />
          <Route path="/payment" component={PaymentMethodPage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
          <Route path="/orderhistory" component={OrderHistoryPage} />
          <Route
            path="/search/name/:name?"
            component={SearchPage}
            exact
           />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <AdminRoute path="/productlist" component={ProductListPage} />
          <AdminRoute path="/orderlist" component={OrderListPage} />
          <Route path="/" component={HomePage} exact />
        </main>
        <footer className="row center">®INIT All rights reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Substituido a tag <a> por Link
