const {OpenDatabase, CloseDatabase, DBrun} = require('./db')

module.exports = {
    reg: async (req, res) => {
        const reg_data = req.body
        insertUser(`${reg_data.username}`, `${reg_data.password}`)
    }
}

insertUser('username','hashedPassword')

// Функция для вставки данных
async function insertUser(username, hashedPassword) {
    OpenDatabase('./../database/database.db')
    DBrun(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
            console.error(err.message)
            CloseDatabase()
            return;
        }
        console.log('Row added with ID: ' + this.lastID)
        CloseDatabase()
    })
}