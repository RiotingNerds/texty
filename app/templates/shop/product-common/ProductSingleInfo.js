import React from 'react';
import { Link } from 'react-router';
const ProductSingleInfo = ({product}) => {
  return (
    <div className="productInfo">
      <h1 className="brand"><Link className="commonLink" to={'/cheapest-'+product.brandID.slug}>{product.brand}</Link></h1>
      <h1 className="name"><Link className="commonLink" to={'/cheapest-'+product.brandID.slug+"/"+product.slug}>{product.name}{" - "}{product.data.capacity}</Link></h1>
    </div>
  )
}
export default ProductSingleInfo
