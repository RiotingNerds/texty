import NavConstant from './NavConstant'
var _ = require('lodash'),
    WP = require('wordpress-rest-api');

class TopNavAction {
  GetBeautyTips() {
    var wp = new WP({ endpoint: 'http://dailyvanity.sg/wp-json' });
    var self = this
    return dispatch => {
      wp.posts().get(function( err, data ) {
        if ( err ) {
          // handle err 
        }
        dispatch(self.AddPost(NavConstant.ADD_BEAUTY_TIPS,data[0]))
      });
    }
  }
  AddPost(type,value) {
    return {
      type:type,
      post:value
    }
  }
}

let topNavAction = new TopNavAction()

export default topNavAction