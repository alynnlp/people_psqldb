
const settings = require("./settings"); // settings.json

const knex = require("knex")({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

var input = process.argv[2]

knex.select('*').from('famous_people')
.where('first_name', input)
.orWhere('last_name', input)
.asCallback(function(err, result) {
  if (err) return console.error("Connection Error", err);
  result.forEach((person) => {
    console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born '${person.birthdate.getFullYear()}-${person.birthdate.getMonth() + 1}-${person.birthdate.getDate()}'`)
  });
});
