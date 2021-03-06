const express = require('express');
const app = express()


app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))
app.use('/jcadmin',express.static(__dirname + '/admin'))
app.use('/',express.static(__dirname + '/web'))
app.set('secret','oj3431iod9q0wu421421o9d')

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000,()=>{
  console.log('http://localhost:3000')
})