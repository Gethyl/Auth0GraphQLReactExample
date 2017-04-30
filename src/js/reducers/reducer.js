import {List} from 'immutable';

const initialState = { loading:true}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'INITIAL_LIST':
	  return {
        ...state,
        loading:action.loading,
        news: action.news
      }
    case 'SET_PROFILE':
	  return {
        ...state,
        profile:action.profile
      }
    case 'CLEAR_PROFILE':
	  return {
        ...state,
        profile:action.profile
      }  
    case 'NOTIFY_USER':
	  return {
        ...state,
        notifyMessage:action.notifyMessage
      }  
    default:
      return state
  }
}

export default reducer