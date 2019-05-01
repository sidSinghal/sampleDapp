var express = require('express')
var app = express()
app.use(express.static(__dirname))
app.get('/notes', function(req, res) {
    res.json({notes: "This is your notebook. Create your notes here (edit this)"})
})

app.listen(3000, ()=> {console.log('server is running on port: ')})