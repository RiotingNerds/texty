import React from 'react';
import { Link } from 'react-router';
const ProductInfo = ({product}) => {
  return (
    <div className="productInfo">
      <h2 className="brand"><Link className="commonLink" to={'/cheapest-'+product.brandID.slug}>{product.brand}</Link></h2>
      <h2 className="name"><Link className="commonLink" to={'/cheapest-'+product.brandID.slug+"/"+product.slug}>{product.name}{" "}{product.data.capacity}</Link></h2>
    </div>
  )
}


export default ProductInfo
