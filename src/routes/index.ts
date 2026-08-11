import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    console.log('u route folder')
    res.send('Hello iz routera')
})

export default router