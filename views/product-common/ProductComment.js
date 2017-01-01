import React from 'react'
var numeral = require('numeral'),
  _ = require('lodash')
const ProductComment = ({product})=>{
  return (
    <div id="reviews">
      <div id="comments">
        <div className="reviewHeader">
          <h2 className="pull-left">Reviews by our community</h2>
          <a className="commonBtn pull-right submitReview" href="#">Submit a Review</a>
          <div className="clearfix"></div>
        </div>
        <p className="woocommerce-noreviews">There are no reviews yet.</p>
      </div>
    </div>
  )
}

export default ProductComment
