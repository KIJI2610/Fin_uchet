const sqilte3 = require('sqlite3').verbose()

let db

module.exports = {
    OpenDatabase: function (namedb){
            db = new sqilte3.Database(`${namedb}`, err => {
            if(err){
                return console.error(`Error database: ${err.message}`)
            }
            console.log('Connected to the in-memory SQlite database.')
        })
    },

    DBrun: function (sql, params, callback) {
        if (!db) {
            return console.error('Database is not open.');
        }
        db.run(sql, params, callback); // Запускаем запрос
    },

    DBall: function (sqlCode, dataList, func){
        db.all(sqlCode, dataList, func)
    },

    CloseDatabase: function (){
        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
}
