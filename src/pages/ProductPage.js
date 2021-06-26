import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProducts(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div >
      <Link to="/"><strong><i className="fa fa-arrow-left" /> Voltar ao início</strong></Link>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <br/>
          <div style={{justifyContent: 'space-evenly'}} className="row top">
            <div>
              <img
                className="large"
                src={`http://localhost:3333/${product.image}`}
                alt={product.name}
              />
            </div>
            <div style={{maxWidth: '520px', minWidth: '213px'}}>
              <div className="col-1">
                <ul>
                  <li>
                    <h1>{product.name}</h1>
                  </li>
                  <li>Valor: R$ {product.price}</li>
                  <li>
                    <p>Description: {product.description}</p>
                  </li>
                </ul>
              </div>
              <div className="col-1">
                <div className="card card-body">
                  <ul>
                    <li>
                      <div className="row">
                        <div>Valor</div>
                        <div className="price">R$ {product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div>Status</div>
                        <div>
                          {product.countInStock > 0 ? (
                            <span className="success">Em estoque</span>
                          ) : (
                            <span className="danger">Indisponível</span>
                          )}
                        </div>
                      </div>
                    </li>
                    {product.countInStock > 0 && (
                      <>
                        <li>
                          <div className="row">
                            <div>Quantidade</div>
                            <div>
                              <select
                                value={qty}
                                onChange={e => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  x => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ),
                                )}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button
                            type="button"
                            className="primary block"
                            onClick={addToCartHandler}
                          >
                            Adicionar ao carrinho
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
