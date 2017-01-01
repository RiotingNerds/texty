import React from 'react'
export default function Loading({text="Loading new products"}) {
  return (<div>
    <i className="fa fa-2x fa-spinner fa-spin"></i>{" "}
    <span>{text}</span>
  </div>)
}