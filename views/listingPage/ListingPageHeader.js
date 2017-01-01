import React from 'react'

const ListingPageHeader = ({title="Search Results for:",text})=> {
  return (
    <header className="entry-header page-header grid-12">
      <small>{title}</small><br />
      <div className="title-with-sep">
        <h1 className="title">{text}</h1>
      </div>
    </header>
  )
}

export default ListingPageHeader