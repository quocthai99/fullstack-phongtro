import express from "express"

const router = express.Router()

router.post("/register", (req, res) => {
    res.status(200).json('ok!')
})


export default router