import React from 'react'
import { Link } from 'react-router';

const NavItem = ({onClick, props}) => {
  return (<li>
      <a href="#" onClick={()=>{onClick("page layouts"); return false;}}><i className="icon-stack2"></i> <span>Page layouts</span></a>
      <ul>
        <li><a href="layout_navbar_fixed.html" onClick={()=>{onClick("page layouts2"); return false;}}>Fixed navbar</a></li>
        <li><a href="layout_navbar_sidebar_fixed.html" onClick={()=>{onClick("page layouts3"); return false;}}>Fixed navbar &amp; sidebar</a></li>
        <li><a href="layout_sidebar_fixed_native.html" onClick={()=>{onClick("page layouts4"); return false;}}>Fixed sidebar native scroll</a></li>
        <li><a href="layout_navbar_hideable.html">Hideable navbar</a></li>
        <li><a href="layout_navbar_hideable_sidebar.html">Hideable &amp; fixed sidebar</a></li>
        <li><a href="layout_footer_fixed.html">Fixed footer</a></li>
        <li className="navigation-divider"></li>
        <li><a href="boxed_default.html">Boxed with default sidebar</a></li>
        <li><a href="boxed_mini.html">Boxed with mini sidebar</a></li>
        <li><a href="boxed_full.html">Boxed full width</a></li>
      </ul>
    </li>
  )
}

export default NavItem