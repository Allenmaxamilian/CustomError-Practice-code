const express = require('express');      // requiring express
const req = require('express/lib/request');
const app = express();                   // executing express
const morgan = require('morgan');
                                        // to use middleware in express.js, use the app.use() method and input the middleware as defined in the NPM docs
                                        // Middleware is used as code that can be run before any of the route handlers execute such as Authentication
const AppError = require('./AppError')

app.use(morgan('tiny'))                    // Whatever is input into the app.use() method, Express will run it for every single request. IN this case we are using the middleware 'morgan('tiny')' and this will be used/executed for every request.
// app.use((req, res, next)=>{
//     console.log('THIS IS MY FIRST MIDDLEWARE')
//     next();                            // The 'next'  parameter (3rd), is letting the req/res function know that it must be on the look out for a parameter 'next' and within the code block of the req/res, it must execute next() in order to have the next middleware labeled under the parameter next be executed.              
// })

// middleware  keyword is 'next'
app.use((req, res, next)=>{
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log('I LOVE DOGS!!!')
    next();
})

// creating code for verification and saving in variable
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget'){
        next(); 
    }
     throw new AppError('password required', 401);                                 
    // throw new AppError(401,'password required', 400)
}



app.get('/', (req, res) => {              // route one
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})


app.get('/error', (req, res) =>{
    chicken.fly()
})



app.get('/dogs', (req, res) => {          // route two
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('arf arf arf!')
})


// using the verification code we wrote above and passing it into the app.use method.
app.use('/secret', verifyPassword, (req, res)=>{
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I can listen to music')
})

app.get('/admin', (req, res) =>{
    throw new AppError('You are not an admin', 403)
})


app.use((req,res)=>{
    res.send('NOT FOUND')
})

// ERROR handling must be put at the bottom of the file
app.use((err,req,res,next) =>{
    const {status = 500} = err;
    const {message = 'SOmething went wrong'} = err;
    res.status(status).send('ERRORRR!!!')
})




app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})