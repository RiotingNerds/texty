import { connect } from 'react-redux'
import {Link} from 'react-router'
import React from 'react'
import ProductRetailer from '../product-common/ProductRetailer'
import ProductCheapestPrice from '../product-common/ProductCheapestPrice'
import ProductSingleInfo from '../product-common/ProductSingleInfo'
import ProductImages from '../product-common/ProductImages'
import ProductSingleAction from './ProductSingleAction'
import ProductDescription from '../product-common/ProductDescription'
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Helmet from "react-helmet";

var _ = require('lodash'),
  Scroll = require('react-scroll'),
  scroll = Scroll.scroller;


const mapStateToProps = (state, ownProp) => {
  return {
    product:state.ProductSingleReducer.product,
    query:state.ProductSingleReducer.query,
    brandName:ownProp.params.brand,
    productName:ownProp.params.product,
    loadedProduct:state.ProductSingleReducer.loadedProduct,
    affiliate:state.ProductSingleReducer.affiliate || {}
  }
}

class ProductSingle extends React.Component {
  constructor(props) {
    super(props);
    if(!_.isEmpty(this.props.product)) {
      this.product = this.props.product
    } else {
      this.product = null
    }
  }
  makeTitle(product) {
    if(product) {
      var title = "Buy cheapest discounted [brand] [product] | Lowest Guaranteed"
      title = title.replace("[brand]",product.brandID.name)
      title = title.replace("[product]",product.name)
      document.title = title
    }
  }

  getQueryFromProps(props) {
    return {
      productName:props.productName,
      brandName:props.brandName
    }
  }

  componentDidMount() {

    if(!_.isEqual(this.getQueryFromProps(this.props.query),this.getQueryFromProps(this.props))) {
      this.props.dispatch(ProductSingleAction.getSingleProduct(this.props.brandName,this.props.productName))
      this.makeTitle(this.product)
    }
    if(_.isEmpty(this.props.affiliate)) {
      this.props.dispatch(ProductSingleAction.getAffiliate())
    }
    
  }
  componentWillReceiveProps(nextProps) {
    if(!_.isEmpty(nextProps.product)) {
      this.product = nextProps.product
      this.makeTitle(this.product)
    }
    if(_.isEmpty(this.props.affiliate)) {
      this.props.dispatch(ProductSingleAction.getAffiliate())
    }
  }
  getURL() {
    return "http://shop.dailyvanity.sg"+this.props.location.pathname
  }

  render() {
    if(this.props.loadedProduct) {
      scroll.scrollTo("breadCumbContainer",{
        duration: 1000,
        delay: 100,
        smooth: true,
      });
    }
    
    if(_.isEmpty(this.product))
      return (<div></div>)
    else
      var headerTitle = "Cheapest "+this.product.brand + " - " + this.product.name + " " + this.product.data.capacity
      var desc = "Compare prices for "+this.product.brand+" "+this.product.name+" to get the best beauty deals at cheap prices. Save time & money as we compare more than 10 trustworthy websites to give you the best price for "+this.product.brand+" "+this.product.name+". It's free, fast and easy!"
      return (
        <div id="product" className="motopress-wrapper content-holder clearfix">
          <Helmet
            title={headerTitle}
            meta={[
                {"name": "description", "content": desc},
                {"property": "og:title", "content": headerTitle},
                {"property": "og:description", "content": desc},
                {"property": "og:url", "content": this.getURL()}
            ]}
          />
          <div data-motopress-wrapper-file="page-home.php" data-motopress-wrapper-type="content" className="newWrapper wrapperContainer">
            <div itemscope itemtype="beauty product" id={this.product._id} className="wrapper post-182272 product type-product status-publish has-post-thumbnail product_cat-day-moisturiser product_cat-face-wash product_cat-mask product_cat-serum-essence product_cat-toner brands-sk-ii first instock shipping-taxable purchasable product-type-simple">
              <Breadcrumb routes={this.props.routes} params={this.props.params} props={this.props}/>
              <div className="productInfoContainer">
                <div className="left-info grid-6">
                  <ProductSingleInfo product={this.product} />
                </div>
                <div className="right-info grid-6">
                  <ProductCheapestPrice cheapest={this.product.cheapestPrice} aboveName={false}/>
                </div>
              </div>
              <div className="productExtraContainer">
                <div className="productImage grid-4">
                  <ProductImages images={this.product.data.imgUrls} product={this.product} />
                </div>
                <div className="mobilePrice">
                  <ProductCheapestPrice cheapest={this.product.cheapestPrice} aboveName={false}/>
                </div>
                <div className="productRetailerSections grid-6">
                  <ProductRetailer prices={this.product.price} affiliate={this.props.affiliate} />
                  <div className="productDescription">
                    <ProductDescription product={this.product} />
                  </div>
                </div>
              </div>
              <div className="otherConsider">
              </div>
              <meta itemProp="url" content="<?php the_permalink(); ?>" />
            </div>
          </div>
        </div>
      )
  }
}

export default connect(
  mapStateToProps
)(ProductSingle)
