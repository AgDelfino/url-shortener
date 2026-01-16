const express = require('express');
const urlRoute = require('./routes/url')
const {connectMongoose} = require('./connect');
const URL = require('./models/url')

const app = express();
const PORT = 8001
const MONGODB_URI ='mongodb://localhost:27017/short-id-db';

connectMongoose(MONGODB_URI).then(() => console.log('MongoDB Connected'));
// JSON parser needs to happen before the usage of the url route
app.use(express.json())
app.use('/url', urlRoute);
app.get('/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {$push: {visitHistory: {timestamps: Date.now()}}})

    return res.redirect(entry.redirectUrl)
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})