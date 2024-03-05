const express = require('express')
const cors = require('cors')
const pdf = require('html-pdf')
const pdfTemplate = require('./documents')

const app = express()
const port = 3000
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
}))

// post request
app.post('/create-pdf', (req, res) => {
    const data = req.body
    //console.log(data)

    pdf.create(pdfTemplate(data)).toFile('receipt.pdf', (err) => {
        if (err) {
            //console.log('error')
            res.status(500).send(Promise.reject())
        }
        res.status(200).send(Promise.resolve())
    })
})

// get request
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/receipt.pdf`)
})


app.listen(port, () => console.log(`Server is running on port ${port}`))