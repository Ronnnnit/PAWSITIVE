const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  });
  
  const User = mongoose.model('User', userSchema);

  // Registration route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
  
    user.save((err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error registering user');
      }
      res.status(201).send('User registered successfully');
    });
  });
  
  // Login route
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email, password }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error logging in');
      }
      if (!user) {
        return res.status(401).send('Invalid email or password');
      }
      res.status(200).send('Logged in successfully');
    });
  });

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  

