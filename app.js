const express = require('express')
const app = express()
const path = require('path')
const url = require('url')
const session = require('express-session')

//routers
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
//const userRoute = require('./routes/user')
const subscribeRoute = require('./routes/subscribeRoute')
// const searchFlightRoute = require('./routes/searchFlight')
// const dataRoute = require('./routes/data');


//template engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

//static files
app.use(express.static(path.join(__dirname, 'public')))

//url encoded for post requests
app.use(express.urlencoded({ extended: true }))

// Session management
app.use(session({
  secret: 'your_secret_key', // Change this to a secure secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

//routing
app.get('/login', loginRoute)
app.post('/login',loginRoute)
app.post('/register', registerRoute)
//app.use('/user', userRoute)
app.post('/subscribe', subscribeRoute)
// app.post('/search_flight', searchFlightRoute)
// app.use('/data', dataRoute)

// Middleware - Static pages
app.use((req, res, next) => {
  try {
      // Render the requested page by extracting the pathname from the URL
      res.render(url.parse(req.url, true).pathname.substring(1), {userId: req.session.userId});
  } catch (error) {
      // Create a new error and pass it to the next middleware
      const err = new Error('Error rendering the page');
      err.status = 500;
      return next(err); // Forward to error-handling middleware
  }
});

//middleware - error handling
app.use((err, req, res, next) => {
  console.log('error called')
  // Set a default status code (e.g., 500 Internal Server Error if no specific status)
  const statusCode = err.status || 500;

  // Pass the status and error message to the Pug template
  res.status(statusCode).render('error', {
      title: `Error ${statusCode}`,
      statusCode: statusCode,
      message: err.message || 'Something went wrong. Please try again later.'
  });
});
app.get('/Account', (req, res) => {
  res.render('Account'); // Render login.pug
});
app.get('/Cart', (req, res) => {
  res.render('Cart'); // Render index.pug
});
app.get('/login', (req, res) => {
  res.render('login'); // Render index.pug
});
app.get('/register', (req, res) => {
  res.render('register'); // Render index.pug
});

app.get('/Categories', (req, res) => {
  res.render('Categories'); // Render register.pug
});

app.get('/Products', (req, res) => {
  res.render('Products'); // Renders dashboard.pug
});

// Other routes
app.get('/aboutus', (req, res) => {
  res.render('aboutus'); // Renders aboutus.pug
});

app.get('/terms', (req, res) => {
  res.render('terms'); // Renders terms.pug
});

app.get('/privacy', (req, res) => {
  res.render('privacy'); // Renders privacy.pug
});

app.get('/contact', (req, res) => {
  res.render('contact'); // Renders contact.pug
});

app.get('/practice', (req, res) => {
  res.render('practice'); // Renders practice.pug
});
app.get('/error', (req, res) => {
    //res.status(404).render('error', { title: 'Page Not Found', statusCode: 404, message: 'The page you are looking for does not exist.' });
 
res.render('error');});
  



app.get('/subscribe', (req, res) => {
  res.render('subscribe'); // Renders thankyou.pug
});


const port = 7000
app.listen(port, ()=>{
  console.log(`Server is running @ http://localhost:${port}`)
})
