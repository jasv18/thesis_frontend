const serverReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SERVER':
      return state.concat(action.payload)

    case 'REMOVE_SERVERS_IN':
      return state.filter(item => !action.payload.ids.includes(item.id))

    default:
      return state
  }
}

export default serverReducer
