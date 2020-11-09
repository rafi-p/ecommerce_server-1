  const express = require('express')
  const errorHandler = require('./middlewares/errorHandler')
  require('dotenv').config()

  const router = require('./routes/index')
  const app = express()
  const PORT = process.env.PORT
  
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  
  app.use('/', router)
  app.use(errorHandler) 
  
//   app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}/login`)
//   })

module.exports = app