import express from 'express'

const routes = express.Router()

routes.get('/', (request, response) => {
    return false as any
})

export default routes