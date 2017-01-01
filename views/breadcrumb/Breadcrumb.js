import React from 'react'
import Select from 'react-select';
import { connect  } from 'react-redux'
import { browserHistory } from 'react-router';
import {Link} from 'react-router'

var _ = require('lodash'),
  Scroll  = require('react-scroll'),
  Element    = Scroll.Element;

const Breadcrumb =  ({routes, params, props}) => {
  var links = []
  links.push({link:"/",label:"Home"})
  if(routes.length>1) {
    if(routes[1].path=="categories") {
      if(params.mainCat) {
        links.push({link:'/categories/'+params.mainCat,label:props.mainCat})
        if(params.subCat) {
          links.push({link:'/categories/'+params.mainCat+'/'+params.subCat,label:props.subCat})
          if(params.subCat) {
            links.push({link:'/categories/'+params.mainCat+'/'+params.subCat+"/"+params.subSubCat,label:props.subSubCat})
          }
        }
      }
      
    }
    if(routes[1].name=="product") {
      links.push({link:"/"+params.brand,label:props.product.brand})
      if(params.product) {
        links.push({link:"/"+params.brand+'/'+params.product,label:props.product.name})
      }
    }
    if(routes[1].name=="brand") {
      if(!_.isEmpty(props.products) && props.products.length>0) {
        links.push({link:"/"+params.brand,label:props.products[0].brand})  
      } else {
        links.push({link:"/"+params.brand,label:params.brand})
      }
    }
  }
  
  return (
    <Element name="breadCumbContainer" className="wrapper" id="breadCrumbContainer">
      <div className="grid-12">
        {links.map(function(ol,i) {
          return (<span key={i} className="breadLink">
              <Link to={ol.link}>{ol.label}</Link>
          </span>)
        })}
      </div>
    </Element>
  )
}

export default Breadcrumb