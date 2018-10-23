const Sequelize = require('sequelize')
const db = require('../db')

const Campaign = db.define('campaign', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
})

module.exports = Campaign