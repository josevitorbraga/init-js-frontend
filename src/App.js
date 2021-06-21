import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signOut } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderListPage from './pages/OrderListPage';
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
          <div>
            <Link className="brand" to="/">
              SITE NAME
            </Link>
          </div>
          <div>
            <Link to="/cart">
              CARRINHO
              {cartItems.length > 0 && (
                <span className="badge">
                  <strong>{cartItems.length}</strong>
                </span>
              )}
            </Link>

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down" />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productList">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderList">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userList">Users</Link>
                  </li>
                </ul>
              </div>
            )}

            {userInfo ? (
              <div className="dropdown">
                <Link to="#placeholder">
                  {userInfo.name} <i className="fa fa-caret-down" />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Meus Pedidos</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">SIGN IN</Link>
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
