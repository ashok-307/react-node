const express = require('express');
const connectDb = require('./config/db');
const app = express();
const cors = require('cors');
const path = require('path');

connectDb();

const PORT = process.env.PORT || 2445;

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());


// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});
