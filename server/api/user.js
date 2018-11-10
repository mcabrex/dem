const router = require('express').Router()
const {User,Campaign} = require('../db/models')
module.exports = router

router.get('/:username', async (req, res, next) => {
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

router.get('/:username/campaigns', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
          username : req.params.username
      }
    })
    const campaign = await Campaign.findAll({
      where: {
        userId : user.dataValues.id
      }
    })
    res.json(campaign)

  
  } catch (err) {
    next(err)
  }
})

router.post('/:username/campaigns', async (req, res, next) => {
  try {
    if(!req.body) {
      console.log('invalid information:', req.body)
      res.status(401).send('Invalid Campaign information, need a name!')
    } else {
      console.log('campaign body',req.body)
      const campaign = await Campaign.create(req.body)
       res.json(campaign)
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Campaign already exists')
    } else {
      next(err)
    }
  }
})