import SearchConstant from '../constants/SearchConstant'

class SearchAction {
  Search(data) {
    console.log(data)
    return {
      type:SearchConstant.STARTSEARCH,
      data:data
    }
  }
}

let searchAction = new SearchAction()

export default searchAction
