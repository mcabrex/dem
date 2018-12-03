const Sequelize = require('sequelize')
const db = require('../db')

const Character = db.define('character', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Campaigns needs a title!"
      }
    }
  },
  backStory: Sequelize.TEXT,
  class: Sequelize.STRING,
  level: Sequelize.INTEGER
})

module.exports = Character
