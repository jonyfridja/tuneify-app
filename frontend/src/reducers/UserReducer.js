const initialState = {
  loggedInUser: null
}

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.loggedInUser }
    default:
      return state;
  }
};