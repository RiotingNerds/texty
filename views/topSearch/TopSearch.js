import React from 'react'
import Select from 'react-select';
import { connect  } from 'react-redux'
import { browserHistory } from 'react-router';
var Input = require('react-input-field')
const qs = require('querystring')

var _ = require('lodash')
const TopSearch = ({searchText, searchBrand, onSearchChange, onClearSearch}) => {

  var brand = searchBrand
  var text = searchText

  var submitForm = (e)=>{
    e.preventDefault()
    onSearchChange(text,brand)
  }

  var clearSearch = (e)=>{
    e.preventDefault()
    onClearSearch(text,brand)
  }

  var enterPress = (e) => {
    if (e.keyCode == 13) {
        // Do something
      submitForm(e)
    }
  }

  var brandChange = (v)=> {
    brand = v
  }

  var textChange = (v)=> {
    text = v
  }

  return (
    <div className="topSearchForm wrapper">
      <form method="get" className="topSearch grid-12" onSubmit={submitForm} noValidate>
        <div className="clearfix" id="lightboxForm">
           <div className="inputContainer">
              <Input
                placeholder="Brand Name"
                className="commonInput textField"
                id="brand"
                onChange={brandChange}
                defaultValue={brand}
                onKeyUp={enterPress}
                name="sb" />
          </div>
          <div className="inputContainer">
              <Input
                placeholder="Product Name"
                className="commonInput textField"
                id="product_name"
                onChange={textChange}
                onKeyUp={enterPress}
                defaultValue={text}
                name="s" />
          </div>
          <div className="btnContainer">
            <a type="submit" className="commonBtn" onClick={submitForm} value="search price!" id="newsletterSubmit">Search Price</a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TopSearch

