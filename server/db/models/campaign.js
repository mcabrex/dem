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
        msg: "Campaign title required"
      }
    }
  },
  description: Sequelize.TEXT
})

module.exports = Campaign
