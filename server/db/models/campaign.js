const Sequelize = require('sequelize')
const db = require('../db')

const Campaign = db.define('campaign', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: Sequelize.TEXT
})

module.exports = Campaign
