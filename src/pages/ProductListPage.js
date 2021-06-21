import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';

export default function ProductListPage(props) {
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector(state => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [dispatch, createdProduct, successCreate, props.history, successDelete]);

  const deleteHandler = product => {
    if (window.confirm('Tem certeza que deseja remover o produto?')) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="row" style={{ marginBottom: '2rem' }}>
        <h1>Produtos</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Adicionar novo produto
        </button>
      </div>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox />}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>CATEGORIA</th>
              <th>AÇOES</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>R$ {product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    EDITAR
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    REMOVER
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
