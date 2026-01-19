const ids = require('short-id')
const URL = require('../models/url')

async function handleGenerateNewUrl(req, res) {
    console.log('Im enter this function')
    const shortId = ids.generate()
    const url = req.body.url;

    if(!url) return res.status(400).json({error: 'URL is necessary'})
    await URL.create({
        shortId,
        redirectUrl: url,
        visitHistory: []
    })
    return res.render('home', {id: shortId})
}

async function handleDeleteUrl (req,res) {
    const shortId = req.params.shortId;
    await URL.findOneAndDelete({shortId})

    return res.status(200).json({id: shortId})
}

async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({shortId})

    return res.status(200).json({totalClicks: entry.visitHistory.length, analytics: entry.visitHistory})
}

module.exports = {
    handleGenerateNewUrl,
    handleDeleteUrl,
    handleGetAnalytics
}