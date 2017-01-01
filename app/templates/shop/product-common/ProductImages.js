import React from 'react';
import { Link } from 'react-router';
import Helmet from "react-helmet";
import ReactImageFallback from "react-image-fallback";
var numeral = require('numeral'),
  _ = require('lodash')
const ProductImages = ({images, product})=>{
  var altText = "cheapest "+product.brandID.name+" "+product.name
  if(images) {
    var originalImageLink = images[0]
    var image = images[0].replace("https://","//").replace('http://',"//")
    return (
      <Link to={'/cheapest-'+product.brandID.slug+"/"+product.slug}>
        <Helmet
            meta={[
                {"property": "og:image", "content": originalImageLink}
            ]}
          />
          <ReactImageFallback
            src={image}
            fallbackImage="http://images.dailyvanity.sg/wp-content/uploads/2016/12/default-product-image.jpg"
            initialImage="http://images.dailyvanity.sg/wp-content/uploads/2016/12/loading6.gif"
            alt={altText} />
      </Link>
    )
  }
  else
    return (<Link to={'/cheapest-'+product.brandID.slug+"/"+product.slug}><img alt={altText} src="" /></Link>)
}
export default ProductImages
