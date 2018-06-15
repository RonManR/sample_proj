var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

/* setup template engine */
app.set('view engine', 'ejs');

/* static files */
app.use(express.static('./public'));

/* call controllers */
todoController(app);

/* port */
app.listen(3000);
console.log('Serving application at port 3000');
