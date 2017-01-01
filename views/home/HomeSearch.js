import React from 'react'
import SearchForm from './SearchForm'

class HomeSearch extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="searchWrapper">
        <div className="wrapper searchContainer">
          <div className="brandLogos grid-7">
            <h2 className="title">We compare products from the online beauty stores you love</h2>
            <img className="homeImage" src="http://images.dailyvanity.sg/wp-content/uploads/2016/12/compare-cheapest-beauty-products.jpg" />
            <h2 className="subTitle">&amp; many more!</h2>
            <h2 className="title">...to give you the best price!</h2>
          </div>
          <SearchForm />
          <div className="clearfix"></div>
        </div>

      </div>
    )
  }
}

export default HomeSearch
