import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen() {
  const { name = '' } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts(name));
  }, [dispatch, name]);
  return (
    <div>
      <Link to="/"><strong><i className="fa fa-arrow-left" /> Voltar ao início</strong></Link>
      <div className="row">
        {loading ? (
          <LoadingBox/>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="col-1"><h1 className="title">{products.length} resultados para: {name}</h1></div>
        )}
      </div>
      <div>

      <div className="row top">
        
        <div className="col-2">
          {loading ? (
            <LoadingBox/>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}/>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      </div>

    </div>
  );
}