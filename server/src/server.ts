import express from 'express'

const app = express()

app.get('/', () => {
    console.log('home')
})

app.listen(3333)