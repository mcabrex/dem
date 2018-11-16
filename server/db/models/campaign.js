const Sequelize = require('sequelize')
const db = require('../db')

const Campaign = db.define('campaign', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Campaigns needs a title!"
      }
    }
  },
  description: Sequelize.TEXT
})

module.exports = Campaign
