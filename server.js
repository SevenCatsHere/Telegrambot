const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Clungebots House. Beware the busted minge!Q'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))