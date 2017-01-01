import SearchFormConstant from './SearchFormConstant'
var category = require('./category.json'),
  _ = require('lodash')

var subCategoryListing = []

var mainCat = []
_.forEach(category,function(types,categories) {
  mainCat.push({value:categories,label:categories})
})

export default function SearchFormReducer(state={type:SearchFormConstant.NOTHING,searchError:"",searchBrand:"",searchText:"",brands:[],selectedBrand:"",category:"",subCategory:"",subCategoryListing:subCategoryListing,mainCategoryListing:mainCat},action) {
  switch(action.type) {
    case SearchFormConstant.CHANGE_CATEGORY:
      return Object.assign({},state,{category:action.category,subCategory:action.subCategory,subCategoryListing:action.subCategoryListing})
    case SearchFormConstant.CHANGE_TYPE:
      return Object.assign({},state,{subCategory:action.subCategory})
    case SearchFormConstant.ADD_BRAND_TO_LIST:
      return Object.assign({},state,{brands:action.brands})
    case SearchFormConstant.CHANGE_BRAND:
      return Object.assign({},state,{searchBrand:action.value})
    case SearchFormConstant.SEARCH_TEXT:
      return Object.assign({},state,{searchText:action.value})
    case SearchFormConstant.SUBMIT_FORM_ERROR:
      return Object.assign({},state,{searchError:action.value})
    default:
      return state
  }
}
