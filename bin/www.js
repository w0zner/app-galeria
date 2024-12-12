const http=require('http')
const app = require('../app')
require('dotenv').config()


const port = parseInt(process.env.PORT, 10) || 8010
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
