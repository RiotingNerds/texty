import React from 'react'


var Entities = require('html-entities').AllHtmlEntities,
  entities = new Entities()

const ProductDescription = ({product}) => {
  return (
    <div className="productRetailers">
      <h2 className="subTitle">About {product.brandID.name}{" "}{product.name}</h2>
      <div>
        <div className="single-box clearfix entry-content" dangerouslySetInnerHTML={{__html: entities.decode(product.c__description)}} />
      </div>
    </div>
  )
}


export default ProductDescription
