var express = require('express');
// var hbs = require('hbs');
var app = express();
var path = require('path');
var knex = require('knex')
var bodyParser = require('body-parser')

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended:true }))



var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true
})


app.get('/', function (req, res) {
  res.render('tweetPost');
});

app.post('/newTweet', function (req, res) {
    console.log('this is req.body:', req.body)
  knex('tweets').insert({tweeted: req.body.tweeted})
  .then(function(data){
    res.send('success')
  })
  console.log('this is post knex:', req.body.tweeted)
})

app.get('/allTweets', function (req, res) {
  knex.select().table('tweets')
  .then(function(data) {
    res.render('viewAllTweets', { data: data })
    console.log('this is data: ', data)
  })
})

app.get('/newUser', function (req, res) {
  res.render('signUp');
});

app.post('/newUser', function (req, res) {
  knex('users').insert({ email: req.body.email, hashed_password: req.body.password })
  .then(function(data){
    res.send('success')
  })
  console.log('req', req.body)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
