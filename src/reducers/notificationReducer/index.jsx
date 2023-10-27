const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return { notify: { ...action.payload } }

    case 'REMOVE_NOTIFICATION':
      return {}

    default:
      return state
  }
}

export default notificationReducer
