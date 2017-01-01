import React from 'react'
import Banner from '../header/banner'
import TopNav from '../topNav/Nav'
import Helmet from "react-helmet";

const Header = (props) => {
  return (<header id="masthead" role="banner" className="clearfix with-menu hide-strip top-strip-fixed" itemscope="" itemtype="http://schema.org/WPHeader">
      <Helmet
          defaultTitle="Find the cheapest beauty products that ships to Singapore"
        />
      <div className="no-print top-strip">
        <div className="wrapper clearfix">
          <form method="get" id="searchform" action="http://dailyvanity.sg/" role="search" className="ng-pristine ng-valid"> 
            <input type="text" name="s" id="s" value="Search" onfocus="if(this.value=='Search')this.value='';" onblur="if(this.value=='')this.value='Search';" /> 
            <button type="submit"> <i className="icomoon-search"></i> </button>
          </form>
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
          <div id="topContainer"> 
            <a href="#" id="open-pageslide" data-effect="st-effect"><i className="icomoon-menu"></i></a> 
            <a href="http://dailyvanity.sg"> <img className="smallLogo" src="http://dailyvanity.sg/wp-content/themes/simplemag-child/images/logoSmall.png" /> </a>
          </div>
        </div>
      </div>
      <Banner />
      <TopNav />
    </header>
  )
}
export default Header