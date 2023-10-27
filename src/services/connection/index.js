import encryptionServices from '../encryption'
import { fethRequestErrorResponse } from '../../consts'

const baseUrl = '/api/serverconn'
const entryPointToValidate = 'validate'
const entryPointToGetDatabases = 'databases'

const postRequestTemplate = async (objectConn, entryPoint) => {
  try {
    const response = await fetch(`${baseUrl}/${entryPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: encryptionServices.objectEncryption(objectConn)
    })
    return await response.json()
  } catch (err) {
    return fethRequestErrorResponse
  }
}

const validateConnection = async (objectConn) => await postRequestTemplate(objectConn, entryPointToValidate)

const getDatabases = async (objectConn) => await postRequestTemplate(objectConn, entryPointToGetDatabases)

const connectionService = { validateConnection, getDatabases }

export default connectionService
