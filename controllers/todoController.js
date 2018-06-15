var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/* Connect to the database */
mongoose.connect('mongodb://localhost:27017/todo');

/* Create a schema */
var todoSchema = new mongoose.Schema({
  item: String
});

/* Model */
var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    /* get data from mongodb and pass to the view */
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });

  });

  app.post('/todo', urlencodedParser, function(req, res){
    /* Get data from the view and add it to mongodb */
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req, res){
    /* Delete the requested item from mongodb */
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });
  });

};
