import SearchConstant from '../constants/SearchConstant'

export default function SearchReducer(state={type:SearchConstant.EMPTY,datass:""},action) {
	switch(action.type) {
		case SearchConstant.STARTSEARCH: 
			return Object.assign({},state,action)
		default: 
			return state
	}
}