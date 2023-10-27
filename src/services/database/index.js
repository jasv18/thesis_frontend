import { fethRequestErrorResponse } from '../../consts'
import encryptionServices from '../encryption'

const baseUrl = '/api/databaseconn'

const getPayrolls = async (objectConn, databaseName) => {
  try {
    const response = await fetch(`${baseUrl}/${databaseName}/payrolls`, {
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

const generateNewDb = async (objectConn, srcDatabaseName, dstDatabaseName, payrolls = [], signal = undefined) => {
  try {
    const response = await fetch(`${baseUrl}/${srcDatabaseName}/generate/${dstDatabaseName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: encryptionServices.objectEncryption({ ...objectConn, payrolls }),
      signal
    })
    return await response.json()
  } catch (err) {
    return fethRequestErrorResponse
  }
}

const databaseService = { getPayrolls, generateNewDb }

export default databaseService
