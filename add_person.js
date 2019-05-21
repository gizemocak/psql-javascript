const settings = require("./settings"); // settings.json
const arg = process.argv.slice(2)

const db = require('knex')({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});

//searching famous people
db.select('*')
  .from('famous_people')
  // .where('first_name', 'like', arg[0])
  // .orWhere('last_name', 'like', arg[0])
  .then(function (response) {
    console.log(response)
  }).catch(function (err) {
    console.log(err)
  })
process.exit();

//inserting famous people
db('famous_people')
  .insert({
    first_name: arg[0],
    last_name: arg[1],
    birthdate: arg[2]
  }).then(res => {
    console.log(res)
  }).finally(() => {
    knex.destroy();
  })