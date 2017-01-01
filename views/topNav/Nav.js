import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import topNavAction from './TopNavAction';
import ListLink from '../common/ListLink';
var _ = require('lodash');

let othersLink = require('./NavItems.json')

const mapStateToProps = (state) => {
  return {
    beautyTips:state.TopNavReducer.beautyTips,
    reviews:state.TopNavReducer.review
  }
}

const SubMenuItem = (post) => {
  var media = "";
  var width = "";
  var height = "";
  var mediaInfo = post["_embedded"]["wp:featuredmedia"][0]
  if(_.has(mediaInfo, ["media_details","sizes","rectangle-size-small"])) {
    media = _.get(mediaInfo,["media_details","sizes","rectangle-size-small","source_url"])
    //width = _.get(mediaInfo,["media_details","sizes","rectangle-size-small","width"])
    //height = _.get(mediaInfo,["media_details","sizes","rectangle-size-small","height"])
  }
  return (<li key={post.id}>
    <figure>
      <a href={post.link}>
        <img src={media} alt={post.title.rendered} width={width} height={height} />
      </a>
    </figure>
    <a href={post.link} dangerouslySetInnerHTML={{__html: post.title.rendered}} />
  </li>)
}


let SubMenuContainer = ({posts}) => {
  var list = posts.map(function(post) {
    return SubMenuItem(post)
  })
  return (
    <ul className="sub-posts">
     {list}
    </ul>
  )
}

const Nav = ({beautyTips, reviews}) => {
  return (
    <div className="no-print animated main-menu-container">
      <nav className="wrapper main-menu clearfix" role="navigation" itemScope="itemscope" itemType="http://schema.org/SiteNavigationElement">
        <ul id="menu-main-menu" className="menu">
          <ListLink link="/" text="Home" />
          <ListLink link="/k-makeup-tips" text="K-Makeup Tips" />
          <li id="menu-item-11488" className="menu-item menu-item-type-taxonomy menu-item-object-category sub-menu-full-width link-arrow">
            <a href="http://dailyvanity.sg/beauty-tips/">Beauty Tips</a>
            <div className="sub-menu">
              <SubMenuContainer posts={beautyTips} />
            </div>
          </li>
          <li id="menu-item-18681" className="dealMenu menu-item menu-item-type-custom menu-item-object-custom sub-menu-full-width link-arrow">
            <a href="http://dailyvanity.sg/deal">Vanity Perks</a>
          </li>
          <li id="menu-item-11489" className="menu-item menu-item-type-taxonomy menu-item-object-category sub-menu-full-width link-arrow">
              <a href="http://dailyvanity.sg/beauty-reviews/">Reviews</a>
              <div className="sub-menu">
                <SubMenuContainer posts={reviews} />
              </div>
          </li>
          <li id="menu-item-11491" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children sub-links-only link-arrow"><a href="#">More +</a>
            <div className="sub-menu">
              <ul className="sub-links">
                {othersLink.map((l)=> {
                  return (<ListLink link={l.link} text={l.text} />)
                })}
                
              </ul>
            </div>
          </li>
        </ul>
        <div className="header header-search">
          <div className="inner">
            <div className="inner-cell">
              <ul className="social">
                <li><a href="#" className="icomoon-share social-share-link"></a>
                  <ul>
                    <li><a href="http://www.facebook.com/dailyvanity" className="icomoon-facebook" target="_blank"></a></li>
                    <li><a href="http://twitter.com/DailyVanitySG" className="icomoon-twitter" target="_blank"></a></li>
                    <li><a href="http://instagram.com/dailyvanity/" className="icomoon-instagram" target="_blank"></a></li>
                    <li><a href="http://www.youtube.com/user/DailyVanity" className="icomoon-youtube" target="_blank"></a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

const TopNav = connect(
  mapStateToProps
)(Nav)
export default TopNav