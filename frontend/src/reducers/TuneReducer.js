const initialState = {
  items: [],
  selected: null
};

export default function(state = initialState, action = {}) {
  let tunes;
  let idx;
  switch (action.type) {
    case 'SET_TUNES':
      return { ...state, items: action.items };

    case 'TUNE_ADD':
      return { ...state, items: [...state.items, action.tune] };

    case 'TUNE_UPDATE':
      const { tune } = action;
      tunes = state.items.splice();
      idx = tunes.findIndex(t => t._id === action.tune._id);
      if (idx === -1) return state;
      tunes.splice(idx, 1, tune);
      return { ...state, items: tunes };

    case 'TUNE_REMOVE':
      tunes = state.items.splice();
      idx = tunes.findIndex(t => t._id === action.tune._id);
      if (idx === -1) return state;
      tunes.splice(idx, 1);
      return { ...state, items: tunes };

    default:
      return state;
  }
}
