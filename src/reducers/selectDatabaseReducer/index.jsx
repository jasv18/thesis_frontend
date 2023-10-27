const selectDatabaseReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_DATABASE':
      return { ...state, ...action.payload }

    case 'DESELECT_DATABASE':
      return null

    default:
      return state
  }
}

export default selectDatabaseReducer
