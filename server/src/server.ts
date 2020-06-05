import express from 'express'
import routes from './routes'
import path from 'path'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/tmp', express.static(path.resolve(__dirname, '..', 'tmp')))

app.listen(3333)