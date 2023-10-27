const selectServerReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_SERVER':
      return { ...state, ...action.payload }

    case 'DESELECT_SERVER':
      return null

    default:
      return state
  }
}

export default selectServerReducer
