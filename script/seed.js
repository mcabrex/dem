'use strict'

const db = require('../server/db')
const {User,Campaign} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({username: 'cody', email: 'cody@email.com', password: '123'}),
    User.create({username: 'murphy', email: 'murphy@email.com', password: '123'}),
    User.create({username: 'Otagwenko', email: 'mrcabardo@gmail.com', password: 'league'})
  ])

  const campaigns = await Promise.all([
    Campaign.create({
      title: 'Codys Fun-house',
      description: 'ooga booga wooga',
      userId: 1
    }),
    Campaign.create({
      title: 'The path less Codyd',
      description: 'ooga booga wooga',
      userId: 1
    }),
    Campaign.create({
      title: 'Murph Nation Yall',
      description: 'ooga booga wooga',
      userId: 2
    }),
    Campaign.create({
      title: 'Murphys spooky kingdom',
      description: 'ooga booga wooga',
      userId: 2
    }),
    Campaign.create({
      title: 'Otag Bopag Lowtag',
      description: 'ooga booga wooga',
      userId: 3
    }),
    Campaign.create({
      title: 'The House of Cheese',
      description: 'ooga booga wooga',
      userId: 3
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${campaigns.length} campaigns`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
