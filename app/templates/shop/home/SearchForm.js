import React from 'react'
import Select from 'react-select';
import searchFormAction from './SearchFormAction';
import ListingPageAction from '../listingPage/ListingPageAction';
import { connect  } from 'react-redux'
import { browserHistory } from 'react-router';
var Input = require('react-input-field')
const qs = require('querystring')

var categories = require('./category.json'),
  _ = require('lodash')


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  componentDidMount() {
  }

  validateForm() {
    this.props.errorMsg("")
    if(_.isEmpty(this.props.selectedCategory) &&
      _.isEmpty(this.props.selectedType) &&
      _.isEmpty(this.props.searchText) &&
      _.isEmpty(this.props.searchBrand)) {
      return false;
    }
    return true;
  }

  submitForm(e) {
    e.preventDefault()
    if(!this.validateForm()) {
      this.props.errorMsg("Please select a category or search a product")
      return false;
    }
    var url = "/categories/"
    if(!_.isEmpty(this.props.selectedBrand)) {
      url = "/cheapest-"+this.props.selectedBrand
    } else {
      if(!_.isEmpty(this.props.selectedCategory)) {
        url += this.props.selectedCategory
        if(!_.isEmpty(this.props.selectedType)) {
          url+="/"+this.props.selectedType
        }
      }
    }
    url += "?"+qs.stringify({s:this.props.searchText,sb:this.props.searchBrand})
    this.props.onSubmit(url)
  }

  render() {
    return (
      <div className="signupFormContainer">
        <form method="get" className="signupform grid-4" onSubmit={this.submitForm} noValidate>
          <div className="clearfix" id="lightboxForm">
              <div className="inputContainer">
                  <label>Category</label>
                  <Select
                    name="category"
                    className="emailInput textField"
                    value={this.props.selectedCategory}
                    placeholder="Select a category"
                    clearable={true}
                    options={this.props.mainCategoryListing}
                    onChange={this.props.onCategoryChange}
                  />
              </div>
               <div className="inputContainer">
                  <label>Brands</label>
                  <Input
                    placeholder="Brand Name"
                    className="commonInput textField"
                    id="brand"
                    defaultValue={this.props.searchBrand}
                    onChange={this.props.onBrandChange}
                    name="sb" />
              </div>
              <div className="inputContainer">
                  <label>Product Name</label>
                  <Input
                    placeholder="Product Name"
                    className="commonInput textField"
                    id="product_name"
                    defaultValue={this.props.searchText}
                    onChange={this.props.onSearchChange}
                    name="s" />
                    <div className="help-block">
                      Use keywords like "genifique", "snowise", "facial treatment essence"
                    </div>
              </div>
              <div className="btnContainer">
                  <input type="submit" className="commonBtn shopSearchBtn" value="find me the best price!" id="newsletterSubmit" />
              </div>
              <div>
                {this.props.searchError}
              </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.SearchFormReducer.category,
    selectedType: state.SearchFormReducer.subCategory,
    subCategoryListing: state.SearchFormReducer.subCategoryListing,
    mainCategoryListing: state.SearchFormReducer.mainCategoryListing,
    selectedBrand: state.SearchFormReducer.selectedBrand,
    brands: state.SearchFormReducer.brands,
    searchText: state.SearchFormReducer.searchText,
    searchBrand: state.SearchFormReducer.searchBrand,
    searchError:state.SearchFormReducer.searchError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCategoryChange: (category) => {
      dispatch(searchFormAction.SelectCategory(category))
    },
    onSearchChange: (value) => {
      dispatch(searchFormAction.SearchText(value))
    },
    onBrandChange: (category) => {
      dispatch(searchFormAction.SearchBrand(category))
    },
    onTypeChange:(type) => {
      dispatch(searchFormAction.SelectType(type))
    },
    errorMsg: (value) => {
      dispatch(searchFormAction.FormError(value))
    },
    onSubmit: (url) => {
      browserHistory.push(url)
    },
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm)
