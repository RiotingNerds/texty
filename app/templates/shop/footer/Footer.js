import ListLink from '../common/ListLink'
var footerLinks = require('./footer.json')
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Newsletter from './Newsletter'

let FooterMenu = ({items}) => {
  return (
    <div class="menu-footer-menu-container">
      <ul id="menu-footer-menu" class="menu">
        {items.map(function(i,k) {
          return (
            <li key={k} class="menu-item">
              <ListLink link={i.link} text={i.text} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
const Footer = () => {
  return (
    <div id="footer">
      <div className="footer-sidebar">
        <div id="supplementary" className="wrapper clearfix columns col-3">
          <div className="widget-area widget-area-1" role="complementary">
            <div id="nav_menu-2" className="widget widget_nav_menu">
              <FooterMenu items={footerLinks['col1']} />
            </div>
          </div>
        <div className="widget-area widget-area-2" role="complementary">
          <div id="nav_menu-3" className="widget widget_nav_menu">
            <FooterMenu items={footerLinks['col2']} />
          </div>
        </div>
        <div className="widget-area widget-area-3" role="complementary">
          <div id="nav_menu-4" className="widget widget_nav_menu">
            <FooterMenu items={footerLinks['col3']} />
          </div>
        </div>
        <div className="widget-area widget-area-4" role="complementary">
          <Newsletter />
        </div>
      </div>
      <div id="DVAddress"> Copyright © 2016 - Daily Vanity Pte Ltd, 77 High Street, #08-14 High Street Plaza, Singapore 179433</div>
      </div>
    </div>
  )
}
export default Footer