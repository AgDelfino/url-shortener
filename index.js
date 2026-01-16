const express = require('express');
const path = require('path');
const urlRoute = require('./routes/url')
const {connectMongoose} = require('./connect');
const URL = require('./models/url')


const app = express();
const PORT = 8001
const MONGODB_URI ='mongodb://localhost:27017/short-id-db';

connectMongoose(MONGODB_URI).then(() => console.log('MongoDB Connected'));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Parsers need to happen before the usage of the url route
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/url', urlRoute);

app.get('/test', (req, res) => {
    return res.render('home')
})

app.get('/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamps: Date.now() } } }
    )

    return res.redirect(entry.redirectUrl)
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
