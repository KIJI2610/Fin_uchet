const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  database: "usersdb",
  password: ""
});

connection.connect((err) => {
    if (err) {
      console.error('Ошибка подключения к базе данных: ' + err.stack);
      return;
    }
    console.log('Подключено к базе данных с ID ' + connection.threadId);
  });


module.exports = connection;