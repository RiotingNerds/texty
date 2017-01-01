import { connect } from 'react-redux'
import {Link} from 'react-router'
import React from 'react'
import {RadioGroup, Radio} from 'react-radio-group'
var priceList = require('../assets/price.json'),
  _ = require('lodash')

var PriceListing = ({selectedPrice, onSelectPrice})=>{
  var items = priceList.map((price)=>{
    return (
      <li key={price.id} className="radio">
        <label>
          <Radio value={price.id} />{" "}{price.label}
        </label>
      </li>
    )
  })
  var newPrice = parseInt(selectedPrice)
  return (
    <RadioGroup name="price" selectedValue={newPrice} Component="ol" onChange={onSelectPrice}>
      {items}
    </RadioGroup>
  )
}

const ListingPagePriceSearch = ({selectedPrice, onSelectPrice}) => {
  var changePrice = (v) => {
    _.forEach(priceList, function(p) {
      if(p.id == v) {
        onSelectPrice(p)
        return
      }
    })
  }

  return (
    <div className="categoryContainer filterContainer">
      <h3 className="subSearchHeader">Price</h3>
      <PriceListing selectedPrice={selectedPrice} onSelectPrice={changePrice} />
    </div>
  )
}

export default ListingPagePriceSearch
