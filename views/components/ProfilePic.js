import React, { PropTypes } from 'react'

const ProfilePic = (userObj) => {
  return (
    <div className="sidebar-user-material">
      <div className="category-content">
        <div className="sidebar-user-material-content">
          <a href="#"><img src="assets/images/placeholder.jpg" className="img-circle img-responsive" alt=""></a>
          <h6>{userObj.name}</h6>
          <span className="text-size-small">{userObj.title}</span>
        </div>
                      
        <div className="sidebar-user-material-menu">
          <a href="#user-nav" data-toggle="collapse"><span>My account</span> <i className="caret"></i></a>
        </div>
      </div>
      
      <div className="navigation-wrapper collapse" id="user-nav">
        <ul className="navigation">
          <li><a href="#"><i className="icon-user-plus"></i> <span>My profile</span></a></li>
          <li><a href="#"><i className="icon-coins"></i> <span>My balance</span></a></li>
          <li><a href="#"><i className="icon-comment-discussion"></i> <span><span className="badge bg-teal-400 pull-right">58</span> Messages</span></a></li>
          <li className="divider"></li>
          <li><a href="#"><i className="icon-cog5"></i> <span>Account settings</span></a></li>
          <li><a href="#"><i className="icon-switch2"></i> <span>Logout</span></a></li>
        </ul>
      </div>
    </div>
  )
}
