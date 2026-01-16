const ids = require('short-id')
const URL = require('../models/url')

async function handleGenerateNewUrl(req, res) {
    const shortId = ids.generate()
    const url = req.body.url;

    if(!url) return res.status(400).json({error: 'URL is necessary'})
    await URL.create({
        shortId,
        redirectUrl: url,
        visitHistory: []
    })
    return res.status(200).json({id: shortId})
}

async function handleDeleteUrl (req,res) {
    const shortId = req.params.shortId;
    await URL.findOneAndDelete({shortId})

    return res.status(200).json({id: shortId})
}

module.exports = {
    handleGenerateNewUrl,
    handleDeleteUrl
}