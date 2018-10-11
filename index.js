const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
const monk = require('monk')
const Joi = require('joi');
const dburl = "mongodb://adminTVDEMO:password1234@ds050077.mlab.com:50077/tv-demo-database"
const db = monk(dburl)
const tvShowsCollection = db.get('tvShow')

const newTVShowSchema = Joi.object().keys({
    name: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5),
    url: Joi.string().uri().required()
})

// validateTVShow = (req, res) => {
//     const r = Joi.validate(req.body, newTVShowSchema)
//     console.log(r)
//     if (r.error === null)
//         next()
//     else 
//         res.send(r.error)
// }

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
   })

app.get('/shows', async (req, res) => {
    try {
        const tvShows = await tvShowsCollection.find({})
        res.send(tvShows)
    } catch(err) {
        res.status(500).send(err.message)
        // console.log(err)
    }
})

app.post('/shows', async (req, res) => {
    const result = Joi.validate(req.body, newTVShowSchema)
    if (result.error) {res.status(400).send(result.error)}
    else {
        try {
            const body = req.body
            const savedTVShow = await tvShowsCollection.insert(body)
            res.send(savedTVShow)
        } catch(err) {
            res.status(500).send(err.message)
        }
    }
})

app.put('/shows', (req, res) => res.send('UPDATE show'))

app.delete('/shows', (req, res) => res.send('DELETE SHOW'))

app.listen(port, () => console.log(`Listening on port ${port}!`))