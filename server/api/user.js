const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/:username', async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.findOne({
      where: {
          username : req.params.username
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
