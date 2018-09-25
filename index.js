const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const tvShows = []

// app.get('/shows/:provider', (req, res) => {
//     const msg = `GET Show ${req.query.showName} from ${req.params.provider}`
//     console.log(msg)
//     res.send(msg)
// })

app.get('/shows', (req, res) => {
    const title = req.query.showName
    // console.log(title)
    // res.send(JSON.stringify(tvShows))
    console.log('saved shows:', tvShows)
    const r = tvShows.filter((showDict) => {
        return showDict.showName === title
    })
    res.send(r)
})

app.post('/shows', (req, res) => {
    const body = req.body
    console.log(body)
    // console.log(body)
    // const name = req.body
    // const name = body
    // res.send(`CREATE show ${req.body.showName}`)
    tvShows.push(body)
    // res.send('CREATE show ' + JSON.stringify(body))
    // console.log(tvShows)
    res.send(tvShows)
})

app.put('/shows', (req, res) => res.send('UPDATE show'))

app.delete('/shows', (req, res) => res.send('DELETE SHOW'))

app.listen(port, () => console.log(`Listening on port ${port}!`))