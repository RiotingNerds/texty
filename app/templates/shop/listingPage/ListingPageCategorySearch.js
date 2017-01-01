import { connect } from 'react-redux'
import { Link} from 'react-router'
import React from 'react'
import ListingPageAction from './ListingPageAction'
var category = require('../common/category.json'),
  _ = require('lodash')

var CategoryListing = ({itemList, selectedCategory, isSub=false, baseUrl="/categories", link="/categories", urlQuery={}})=>{
  var loopItem = itemList
  if(!_.isArray(itemList)) {
    loopItem = Object.keys(itemList)
  }
  var selectedCat = selectedCategory[0]
  var items = loopItem.map((cat,index)=>{
    var classname = "indicatorIcon pull-right"
    var selectedClassName = ""
    if(cat==selectedCat) {
      classname = "fa indicatorIcon pull-right fa-chevron-right"
      selectedClassName = "selectedList"
      selectedCategory.shift();
    }
    var childList = ""
    var value = itemList[cat]
    var usedLink = link+ "/"+cat
    if(_.isArray(value) || _.isObject(value)) {
      childList = <CategoryListing itemList={value} selectedCategory={selectedCategory} baseUrl={baseUrl} isSub={true} link={usedLink} urlQuery={urlQuery} />
    }
    
    var catObj = usedLink.split('/')
    
    catObj.shift()
    catObj.shift()

    for(var i=0;i<3;i++) {
      if(_.isEmpty(catObj[i])) {
        catObj[i] = ''
      }
    }
    var l = ListingPageAction.getLink(baseUrl,catObj[0],catObj[1],catObj[2],urlQuery.brand,urlQuery.text,"",1)
    if(baseUrl=="/categories") {
      l = ListingPageAction.getLink(link,catObj[0],catObj[1],catObj[2],urlQuery.brand,urlQuery.text,"",1)
    }

    return (
      <li key={index} className={selectedClassName}>
        <Link to={l}>{cat} <i className={classname}></i></Link>
        {childList}
      </li>
    )
  })
  var oClassName = ""
  if(isSub) {
    oClassName = "subTree"
  }
  return (
    <ol className={oClassName}>
      {items}
    </ol>
  )
}

const ListingPageCategorySearch = ({selectedCategory, link="/categories",urlQuery={}}) => {
  return (
    <div className="categoryContainer filterContainer">
      <h3 className="subSearchHeader">Category</h3>
      <CategoryListing itemList={category} baseUrl={link} link={link} selectedCategory={selectedCategory} urlQuery={urlQuery} />
    </div>
  )
}

export default ListingPageCategorySearch
