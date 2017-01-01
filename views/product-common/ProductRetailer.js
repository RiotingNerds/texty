import React from 'react'
import Truncate from 'react-truncate';
var numeral = require('numeral'),
  _ = require('lodash'),
  Immutable = require('immutable')


const ProductRetailer = ({prices,affiliate=[]})=>{
  var filteredPrices = {}
  var allAffiliate = {}
  var cheapest = {}
  affiliate.map(function(p) {
    if(_.isEmpty(allAffiliate[p._id])) {
      allAffiliate[p._id] = p
    }
  })
  prices.map(function(p) {
    if(_.isEmpty(filteredPrices[p.affiliate._id])) {
      filteredPrices[p.affiliate._id] = p
    }
    if(!_.isEmpty(allAffiliate[p.affiliate._id])) {
      delete allAffiliate[p.affiliate._id]
    }
    if(_.isEmpty(cheapest)) {
      cheapest = p
    }
    if(filteredPrices[p.affiliate._id].amount > p.amount) {
      filteredPrices[p.affiliate._id] = p
    }
    if(cheapest.amount > p.amount) {
      cheapest = p
    }
  })
  if(!_.isEmpty(cheapest))
    delete filteredPrices[cheapest.affiliate._id]

  var otherRetailContainer = ""
  var leftPrices = Immutable.Map(filteredPrices)
  if(leftPrices.size>0) {
    otherRetailContainer = _.sortBy(_.values(filteredPrices),['amount', function(p){return p.affiliate.name}]).map(function(price) {
      return (
        <div key={price.affiliateProduct._id} className="supplierHolder">
          <div className="individualSupplierHolder">
            <div className="supplierLogo">
              <Truncate>
                <a target="_blank" href={price.affiliateProduct.affiliateURL}>{price.affiliate.name}</a>
              </Truncate>
            </div>
            <div className="supplierPrice">
              <a className="commonLink" target="_blank" href={price.affiliateProduct.affiliateURL}>{price.currency} {numeral(price.amount).format('0,0.00')}</a>
            </div>
          </div>
        </div>
      )
    })
  }


  var extraPriceContainer = ""
  var allAffiliateMap = Immutable.Map(allAffiliate)
  if(allAffiliateMap.size>0) {
    extraPriceContainer = allAffiliateMap.map(function(price) {
      return (
        <div key={price._id} className="supplierHolder">
          <div className="individualSupplierHolder">
            <div className="supplierLogo">
              <Truncate>
                {price.name}
              </Truncate>
            </div>
            <div className="supplierPrice">
              Not Selling
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div id="productRetailersContainer" className="productRetailers">
      <h4 className="subTitle">Other Retailers</h4>
      <div className="retailerPrice">
      {otherRetailContainer}
      {extraPriceContainer}
      </div>
    </div>
  )
}

export default ProductRetailer
