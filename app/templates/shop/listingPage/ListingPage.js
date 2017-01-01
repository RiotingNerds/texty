import { connect } from 'react-redux'
import {Link} from 'react-router'
import React from 'react'
import ProductItem from './ProductItem'
import ListingPageAction from './ListingPageAction'
import ListingPageCategorySearch from './ListingPageCategorySearch'
import ListingPageBrandSearch from './ListingPageBrandSearch'
import ListingPagePriceSearch from './ListingPagePriceSearch'
import ListingPageSearch from './ListingPageSearch'
import ListingPageHeader from './ListingPageHeader';
import Pagination from "react-js-pagination";
import { browserHistory } from 'react-router';
import TopSearch from '../topSearch/TopSearch';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Loading from '../common/Loading';
import Helmet from "react-helmet";

var _ = require('lodash'),
  priceList = require('../assets/price.json'),
  diff = require('object-diff'),
  Immutable = require('immutable'),
  Scroll = require('react-scroll'),
  scroll = Scroll.scroller;


const mapStateToProps = (state, ownProp) => {
  var brand = ""
  if(ownProp.params.brand) {
    //brand = ownProp.params.brand.replace("cheapest-","")
  }
  if(!_.isNull(ownProp.location.query.sb) && !_.isUndefined(ownProp.location.query.sb)) {
    brand = ownProp.location.query.sb
  }
  return {
    products:state.ListingPageReducer.products,
    brands:state.ListingPageReducer.brands,
    selectedPrice:state.ListingPageReducer.selectedPrice,
    loadingProduct:state.ListingPageReducer.loadingProduct,
    onlyBrand:ownProp.params.brand || "",
    mainCat:ownProp.params.mainCat || ownProp.location.query.mainCat,
    subCat:ownProp.params.subCat || ownProp.location.query.subCat,
    productQuery: state.ListingPageReducer.query,
    subSubCat:ownProp.params.subSubCat || ownProp.location.query.subSubCat,
    page:ownProp.location.query.page || state.ListingPageReducer.query.page || 1,
    s:(!_.isNull(ownProp.location.query.s) && !_.isUndefined(ownProp.location.query.s))?ownProp.location.query.s:"",
    sb:brand,
    selectedPrice:ownProp.location.query.selectedPrice || state.ListingPageReducer.query.selectedPrice,
    totalCount:state.ListingPageReducer.totalCount,
    hideSearchContainer:state.ListingPageReducer.hideSearchContainer,
    affiliate:state.ListingPageReducer.affiliate || {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeBrand: (searchText) => {
      dispatch(ListingPageAction.searchBrand(searchText.target.value,dispatch))
    },
    onSearchChange: (q) => {
      dispatch(ListingPageAction.searchChange(q))
    },
    dispatch:dispatch
  }
}

class ListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.onBrandCheck = this.onBrandCheck.bind(this)
    this.loadMoreProduct = this.loadMoreProduct.bind(this)
    this.onSelectPrice = this.onSelectPrice.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onClearSearch = this.onClearSearch.bind(this)
    this.timeoutID = 0
    this.searchText = this.props.s
    this.searchBrand = this.props.sb
    this.toggleSearch = this.toggleSearch.bind(this)
  }

  onClearSearch(brand,text) {
    if(_.isEmpty(this.props.mainCat) && _.isEmpty(this.props.onlyBrand)) {
      browserHistory.push({pathname:"/"})
    } else if(this.props.onlyBrand) {
      browserHistory.push(ListingPageAction.getLink("/"+this.props.onlyBrand,"","","","","","",1))
    } else {
      browserHistory.push(ListingPageAction.getLink("/categories",this.props.mainCat,this.props.subCat,this.props.subSubCat,"","","",1))
    }
  }

  onBrandCheck(e) {
    var brands = Immutable.List(this.props.selectedBrands).toArray()
    if(_.indexOf(brands,e.target.value)>=0) {
      _.remove(brands,function(id) {
        return (id == e.target.value)
      })
    } else {
      brands.push(e.target.value)
    }
    var q = this.getQueryObj()
    q.selectedBrands = brands.join(',')
    browserHistory.push({pathname:this.getPathName(),query:q})
  }

  getQueryFromProps(props) {
    return {
      page:props.page,
      mainCat:props.mainCat,
      subCat:props.subCat,
      subSubCat:props.subSubCat,
      onlyBrand:props.onlyBrand,
      selectedPrice:props.selectedPrice,
      s:props.s,
      sb:props.sb
    }
  }

  getQueryObj() {
    return {
      page:this.props.page,
      selectedPrice:this.props.selectedPrice,
      s:this.props.s,
      sb:this.props.sb
    }
  }

  makeTitle(props) {

    var title = "Cheapest"
    var desc = "Compare prices for REPLACE products to get the best beauty deals at cheap prices. Save time & money as we compare more than 10 trustworthy websites to give you the best price for REPLACE products. It's free, fast and easy!";
    var replaceText = ""
    if(props.sb) {
      if(props.products.length>0) {
        var brandName = props.products[0].brand
        replaceText = " "+brandName
      }
    }
    if(props.mainCat) {
      replaceText += " "+props.mainCat
    } else if(props.onlyBrand) {
      var brandName = props.products[0].brand
      replaceText = brandName
    }
    replaceText = _.trim(replaceText)

    if(replaceText=="")
      replaceText = " products"

    title +=" "+replaceText+" in Singapore"
    desc = _.replace(desc,new RegExp("REPLACE","g"),replaceText)

    return {title:title,desc:desc}
  }

  componentDidMount() {
    scroll.scrollTo("breadCumbContainer",{
      duration: 1000,
      delay: 50,
      smooth: true,
    });
    if(!_.isEqual(this.getQueryFromProps(this.props.productQuery),this.getQueryFromProps(this.props))) {
      this.props.dispatch(ListingPageAction.getProducts(this.getQueryFromProps(this.props),true))
    }
    if(_.isEmpty(this.props.affiliate)) {
      this.props.dispatch(ListingPageAction.getAffiliate())
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.getQueryFromProps(nextProps),this.getQueryFromProps(this.props))) {
      const { dispatch } = nextProps
      var changedKeys = _.keysIn(diff(this.props,nextProps))
      var query = this.getQueryFromProps(nextProps)
      dispatch(ListingPageAction.getProducts(query,true))
    }
    if(_.isEmpty(this.props.affiliate)) {
      this.props.dispatch(ListingPageAction.getAffiliate())
    }

  }

  getPathName() {
    var query = this.getQueryFromProps(this.props)

    var url = '/categories/'
    if(!_.isEmpty(this.props.onlyBrand)) {
      url = "/"+this.props.onlyBrand+"/"
    }
    if(query.mainCat) {
      url += query.mainCat+"/"
      if(query.subCat) {
        url += query.subCat + "/"
      }
      if(query.subSubCat) {
        url += query.subSubCat + "/"
      }
    }
    return url
  }

  onSelectPrice(obj) {
    var query = this.getQueryObj()
    query.selectedPrice= obj.id
    browserHistory.push({pathname:this.getPathName(),query:query})
  }

  loadMoreProduct(page) {
    var query = this.getQueryObj()
    query.page= page
    scroll.scrollTo("breadCumbContainer",{
      duration: 1000,
      delay: 50,
      smooth: true,
    });
    browserHistory.push({pathname:this.getPathName(),query:query})
  }

  onSearchChange(searchText,searchBrand) {
    var query = this.getQueryObj()
    query.page = 1
    query.s = searchText
    query.sb = searchBrand
    scroll.scrollTo("breadCumbContainer",{
      duration: 1000,
      delay: 50,
      smooth: true,
    });
    browserHistory.push({pathname:this.getPathName(),query:query})

  }

  toggleSearch(e) {
    e.preventDefault();
    this.props.dispatch(ListingPageAction.toggleHide(!this.props.hideSearchContainer))
  }

  getURL() {
    return "http://shop.dailyvanity.sg"+this.props.location.pathname+this.props.location.search
  }

  getSearchResultMessage(props) {
    var errorMessage = ""
    var query = this.getQueryFromProps(props)
    if(!_.isEmpty(query.s) || !_.isEmpty(query.sb)) {
      errorMessage = "Sorry, we don’t have this product in our database"
    }
    if((!_.isEmpty(query.selectedPrice) && query.selectedPrice != 99) || !_.isEmpty(query.mainCat)) {
      errorMessage = "Sorry, we can’t find a match based on your refining criteria"
    }
    return errorMessage
  }

  render() {
    const {products,brands, s,sb} = this.props
    var currentPage = parseInt(this.props.page)
    var productHtml = "No products found"
    if(this.props.loadingProduct) {
      productHtml = <Loading />
    }
    var self = this
    if(!_.isEmpty(products) && products.length>0) {
      productHtml = products.map(function(product) {
        return (<ProductItem affiliate={self.props.affiliate} key={product._id} product={product} />)
      })
    } else {
      if(!this.props.loadingProduct)
        productHtml = self.getSearchResultMessage(self.props)
    }
    var selectedCategory = [this.props.mainCat,this.props.subCat,this.props.subSubCat]


    var title = "Results for:"
    var value = this.props.mainCat

    if(!_.isEmpty(this.props.s) || !_.isEmpty(this.props.sb)) {
      title = "Search Results for:"
      value = ""
      var valAry = []

      if(this.props.sb)
        valAry.push(this.props.sb)
      if(this.props.s)
        valAry.push(this.props.s)
      value = valAry.join(", ")
    }

    var baseURL = "/categories"
    if(!_.isEmpty(this.props.onlyBrand)) {
      baseURL = "/"+this.props.onlyBrand
      if(products.length>0) {
        value = products[0].brand
      }
    }

    var searchContainerClass = ""
    if(this.props.hideSearchContainer) {
      searchContainerClass = "hideContainer"
    }


    var meta = this.makeTitle(this.props)

    return (
      <div id="listingContainer" className="motopress-wrapper content-holder clearfix">
        <Helmet
          title={meta.title}
          meta={[
              {"name": "description", "content": meta.desc},
              {"property": "og:title", "content": meta.title},
              {"property": "og:description", "content": meta.desc},
              {"property": "og:url", "content": this.getURL()},
              {"property": "og:image", "content": "http://images.dailyvanity.sg/wp-content/uploads/2015/07/dv-logo-square.png"}
          ]}
        />
        <div data-motopress-wrapper-file="page-home.php" data-motopress-wrapper-type="content" className="newWrapper wrapperContainer">
          <Breadcrumb routes={this.props.routes} params={this.props.params} props={this.props} />
          <TopSearch onClearSearch={this.onClearSearch} searchText={s} onSearchChange={this.onSearchChange} searchBrand={sb} />
          <div className="wrapper">
            <ListingPageHeader title={title} text={value} />
          </div>
          <div className="wrapper">
            <div className="grid-3" id="searchContainer">
              <div id="productSearchContainer" className={searchContainerClass}>
                <a href="#" id="mobileHeader" onClick={this.toggleSearch}><h2 className="searchHeader">Refine Your Search</h2></a>
                <h2 className="searchHeader" id="desktopHeader">Refine Your Search</h2>
                <div id="filterContainer">
                  <ListingPageCategorySearch selectedCategory={selectedCategory} link={baseURL} urlQuery={{brand:sb,text:s}} />
                  <ListingPagePriceSearch selectedPrice={this.props.selectedPrice} onSelectPrice={this.onSelectPrice} />
                </div>
              </div>
            </div>
            <div className="grid-8" id="productListing">
              {productHtml}
              <div id="gridControl">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={15}
                  totalItemsCount={this.props.totalCount}
                  pageRangeDisplayed={5}
                  onChange={this.loadMoreProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingPage)
