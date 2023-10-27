const serverReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SERVER':
      return state.concat(action.payload)

    default:
      return state
  }
}

export default serverReducer
