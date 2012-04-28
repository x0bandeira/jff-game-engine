express = require 'express'
app = express.createServer()
port = 3010

app.use express.static(__dirname + '/..')

app.listen(port)
