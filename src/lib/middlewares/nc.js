/* eslint-disable no-unused-vars */
export const onError = (error, req, res, next) => {
  console.error(error?.stack)

  if (error?.response?.data) {
    const { status, data } = error.response
    return res.status(status).json({ success: false, data })
  }

  if (error?.code === 'ECONNREFUSED') {
    return res
      .status(500)
      .json({ success: false, data: 'Could not connect to the API' })
  }

  if (error?.code === 'ECONNRESET') {
    return res
      .status(500)
      .json({ success: false, data: 'Could not connect to the API' })
  }

  if (error.message) {
    return res.status(500).json({ success: false, data: error.message })
  }

  return res.status(500).end()
}

export const onNoMatch = (req, res) => {
  res.status(405).json({ success: false, data: 'Method not allowed' })
}
