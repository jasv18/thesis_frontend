const fethRequestErrorResponse = {
  error_code: undefined,
  error_name: 'FETCHERROR',
  error_msg: 'fetch request error',
  success: false
}

const MESSAGE_TYPES = Object.freeze({
  ERROR: Symbol('E'),
  INFO: Symbol('I'),
  WARNING: Symbol('W'),
  SUCCESS: Symbol('S')
})

export { fethRequestErrorResponse, MESSAGE_TYPES }
