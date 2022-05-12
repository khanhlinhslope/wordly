const withDev = (req, res, next) => {
  const { NODE_ENV } = process.env
  const isDev = NODE_ENV === 'development'

  if (!isDev) {
    return res.status(500).json({
      success: false,
      data: 'This endpoint is only available in development mode'
    })
  }

  next()
}

export default withDev
