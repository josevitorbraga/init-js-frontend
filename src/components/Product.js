import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  return (
    <div className="card" key={product._id}>
      <Link to="product.html">
        <img
          className="medium"
          src={`http://localhost:3333/${product.image}`}
          alt={product.name}
        />
      </Link>
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <div className="price">R${product.price}</div>
      </div>
    </div>
  );
}

// Substituído a tag <a> por link
