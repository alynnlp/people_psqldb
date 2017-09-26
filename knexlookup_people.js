const knex = require("knex");
const settings = require("./settings"); // settings.json
const client = new knex.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// knex.select('name').from('users')
// .where('id', '>', 20)
// .andWhere('id', '<', 200)
// .limit(10)
// .offset(x)
// .asCallback(function(err, rows) {
//   if (err) return console.error(err);
//   knex.select('id').from('nicknames')
//     .whereIn('nickname', _.pluck(rows, 'name'))
//     .asCallback(function(err, rows) {
//       if (err) return console.error(err);
//       console.log(rows);
//     });
// });


var input = process.argv[2]

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name = $1 OR first_name = $1", [input], (err, result) => {

    if (err) {
      return console.error("error running query", err);
    }
    //the result is an object, and each items has a key call row and we can name each item PERSON
    result.rows.forEach( (person) => {
      //this is javascript, so we can use the function getFullYear() to turn the sqldata's date object to JS obj value
      console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born '${person.birthdate.getFullYear()}-${person.birthdate.getMonth() + 1}-${person.birthdate.getDate()}'`)
    })

    client.end();
  });
});

  //i need a function that will search through the create TABLE
  //if the input matches the values of any colume
  //return the items

  //console.log(`- ${id}: ${first_name} ${last_name}, born ${birthdate}`)
