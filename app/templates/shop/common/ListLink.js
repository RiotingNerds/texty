import React from 'react'
export default function ListLink({link,text}) {
  var dvLink = "http://dailyvanity.sg"+link
  return (<li className="menu-item"><a href={dvLink}>{text}</a></li>)
}