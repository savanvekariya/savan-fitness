const express = require('express');
const path = require('path');
const app = express();
var mongoose = require('mongoose');
let port = 80;

mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });

var contactSchema = new mongoose.Schema({
   name: String,
   age: String,
   gender: String,
   email: String,
   address: String,
   phone: String,
});

var Contact = mongoose.model('Contact', contactSchema);

//serving the static files
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//setting the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
   res.render('index', { title: 'Savan Fitness' });
});

app.post('/', (req, res) => {
   var myData = new Contact(req.body);
   myData
      .save()
      .then(() => {
         res.render('index', { message: 'Your data saved successfully.' });
      })
      .catch(() => {
         res.render('index', {
            message: 'There is some problem..!!!',
            color: 'red',
         });
      });
});

app.listen(port, () => {
   console.log(`server is running on port ${port}`);
});
