const pg = require("pg");
const settings = require("./settings"); // settings.json
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// CREATE TABLE famous_people (
//   id BIGSERIAL PRIMARY KEY,
//   first_name VARCHAR(50),
//   last_name VARCHAR(50),
//   birthdate DATE
// );
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Abraham', 'Lincoln', '1809-02-12');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Mahatma', 'Gandhi', '1869-10-02');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Paul', 'Rudd', '1969-04-06');

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
