import { connect } from 'react-redux'
import {Link} from 'react-router'
import React from 'react'
var _ = require('lodash'),
  Input = require('react-input-field')

const ListingPageSearch = ({searchText, onSearchText}) => {
  return (
    <div className="categoryContainer filterContainer">
      <h3 className="subSearchHeader">Search Text</h3>
      <Input
        placeholder="Product Name"
        className="commonInput textField"
        id="product_name"
        onChange={onSearchText}
        defaultValue={searchText}
        name="productName" />
    </div>
  )
}

export default ListingPageSearch
