import React from 'react'
import ProductRetailer from '../product-common/ProductRetailer'
import ProductInfo from '../product-common/ProductInfo'
import ProductCheapestPrice from '../product-common/ProductCheapestPrice'
import ProductImages from '../product-common/ProductImages'
import { Link } from 'react-router';
var numeral = require('numeral');

const ProductItem = ({product,affiliate=[]})=>{
  return (
    <div className="productItem">
      <div className="productImage grid-2">
        <ProductImages images={product.data.imgUrls} product={product} />
        <Link className="commonBtn viewDetailBtn" to={'/cheapest-'+product.brandID.slug+"/"+product.slug}>View Details</Link>
      </div>
      <div className="productDetails grid-6">
        <div className="productDescriptionContainer flex-container">
          <ProductInfo product={product} />
          <ProductCheapestPrice cheapest={product.cheapestPrice} />
        </div>
        <div className="otherRetailContainer">
          <ProductRetailer prices={product.price} affiliate={affiliate} />
        </div>
      </div>
      <div className="clearfix"></div>
    </div>
  )
}

export default ProductItem
