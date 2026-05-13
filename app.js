const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5001

app.use(express.static('dist'))

app.get('/version', (req, res) => {
  res.send('V.3: Run deployment step only for the main branch') // change this string to ensure a new version deployed
})

app.get('/health', (req, res) => {
  res.send('ok')
})

const start = async () => {
  await app.listen(PORT)
  const unusedVar = 'this will break lint'
  console.log(`server started on port ${PORT}`)
}

start()
