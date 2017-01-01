import { connect } from 'react-redux'
import {Link} from 'react-router'
import React from 'react'
var category = require('../common/category.json'),
  _ = require('lodash')

var BrandListing = ({brands,selectedBrands,onBrandCheck})=>{
  var items = brands.map((brand)=>{
    var selected = false
    if(_.indexOf(selectedBrands,brand.id)>=0) {
      selected = true
    }
    return (
      <div className="checkbox" key={brand.id}>
        <label>
          <input onChange={onBrandCheck} checked={selected} type="checkbox" value={brand.id} /> {brand.name}
        </label>
      </div>
    )
  })
  return (
    <div className="brandNameContainer">
      {items}
    </div>
  )
}

const ListingPageBrandSearch = ({brands,onBrandSearch,selectedBrands,onBrandCheck}) => {
  return (
    <div className="brandContainer filterContainer">
      <h3 className="subSearchHeader">Brand</h3>
      <div>
        <input type="text" onChange={onBrandSearch} id="brandSearch" name="brand" placeholder="Search..." />
        <BrandListing brands={brands} onBrandCheck={onBrandCheck} selectedBrands={selectedBrands}/>
      </div>
    </div>
  )
}

export default ListingPageBrandSearch
