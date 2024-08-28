const {OpenDatabase, CloseDatabase, DBrun} = require('./db')

module.exports = {
    reg: async (req, res) => {
        const reg_data = req.body
        OpenDatabase('./../database/database.db')
        insertUser(`${reg_data.username}`, `${reg_data.password}`)
    }
}


// Функция для вставки данных
async function insertUser(username, hashedPassword) {
    OpenDatabase('./../database/database.db')

    DBrun(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
            console.error(err.message)
            CloseDatabase() // Закрываем базу данных при ошибке
            return;
        }
        console.log('Row added with ID: ' + this.lastID)

        // Закрываем базу данных после успешного выполнения
        CloseDatabase()
    })
}

