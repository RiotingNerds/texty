import React from 'react'
var numeral = require('numeral'),
  _ = require('lodash')
const ProductCheapestPrice = ({cheapest,aboveName=true})=>{

  if(_.isEmpty(cheapest)) {
    return (<div></div>)
  }
  var DisplayBtn = () => {
    if(aboveName) {
      return (
        <section>
          <a target="_blank" className="commonBtn" href={cheapest.affiliateProduct.affiliateURL}>View Deal</a>
          <div className="cheapestPriceSupplier">
            <a target="_blank" className="commonLink" href={cheapest.affiliateProduct.affiliateURL}>{cheapest.affiliate.name}</a>
          </div>
        </section>
      )
    } else {
      return (
        <section>
          <div className="cheapestPriceSupplier">
            <a target="_blank" className="commonLink" href={cheapest.affiliateProduct.affiliateURL}>{cheapest.affiliate.name}</a>
          </div>
          <a target="_blank" className="commonBtn" href={cheapest.affiliateProduct.affiliateURL}>View Deal</a>
        </section>
      )
    }
  }
  return (
    <div className="productPriceContainer">
      <div className="productPrice" itemProp="offers" itemScope itemtype="http://schema.org/Offer">
        <div className="headline">Best Price!</div>
        <div><a target="_blank" className="price" href={cheapest.affiliateProduct.affiliateURL}>{cheapest.exchangerates.currency}{" "}{numeral(cheapest.exchangerates.amount).format('0,0.00')}</a></div>
        <div className="affiliateName">{cheapest.affiliateName}</div>
        <meta itemProp="price" content={numeral(cheapest.exchangerates.amount).format('0,0.00')} />
        <meta itemProp="priceCurrency" content={cheapest.exchangerates.currency} />
      </div>
      {DisplayBtn()}
    </div>
  )
}

export default ProductCheapestPrice
