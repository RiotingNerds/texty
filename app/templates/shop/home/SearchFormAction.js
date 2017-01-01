import SearchFormConstant from './SearchFormConstant'
var _ = require('lodash'),
  category = require('./category.json')

class SearchFormAction {
  SelectCategory(cat) {
    var subCategoryListing = []
    if(cat) {
      _.forEach(category[cat.value], function(v) {
        subCategoryListing.push({value:v, label:v})
      })
      return {
        type:SearchFormConstant.CHANGE_CATEGORY,
        category: cat.value,
        subCategory: "",
        subCategoryListing: subCategoryListing
      }
    } else {
      return {
        type:SearchFormConstant.CHANGE_CATEGORY,
        category: "",
        subCategory: "",
        subCategoryListing: subCategoryListing
      }
    }
  }
  SelectType(type) {
    return {
      type:SearchFormConstant.CHANGE_TYPE,
      subCategory: type?type.value:""
    }
  }
  SelectBrand(brand) {
    return {
      type:SearchFormConstant.CHANGE_BRAND,
      selectedBrand: brand?brand.slug:""
    }
  }
  SearchBrand(value) {
    return {
      type:SearchFormConstant.CHANGE_BRAND,
      value: value
    }
  }
  SearchText(value) {
    return {
      type:SearchFormConstant.SEARCH_TEXT,
      value: value
    }
  }
  FormError(value) {
    return {
      type:SearchFormConstant.SUBMIT_FORM_ERROR,
      value: value
    }
  }
  getBrands() {
    var self = this
    var url = "/api/brands"
    return (dispatch) => {
      return fetch(url)
        .then(response => response.json())
        .then(json => {
          dispatch(self.brands(json))
        })
    }
  }
  brands(result) {
    return {
      type: SearchFormConstant.ADD_BRAND_TO_LIST,
      brands:result
    }
  }
  SubmitForm() {

  }
}

let searchFormAction = new SearchFormAction()

export default searchFormAction
