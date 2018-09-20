const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/shows/:provider', (req, res) => {
    const msg = `GET Show ${req.query.showName} from ${req.params.provider}`
    console.log(msg)
    res.send(msg)
})

app.post('/shows', (req, res) => {
    const body = req.body
    console.log(body)
    const name = req.body.showName
    // const name = body
    // res.send(`CREATE show ${req.body.showName}`)
    res.send('CREATE show ' + name)
})

app.put('/shows', (req, res) => res.send('UPDATE show'))

app.delete('/shows', (req, res) => res.send('DELETE SHOW'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))