const {OpenDatabase, CloseDatabase, DBrun} = require('./db')


module.exports = {
    reg: async (req, res) => {
        const reg_data = req.body
        let response
        response = await insertUser(reg_data.username, reg_data.password)
        if(response.result === true){
            res.send('registration_was_successful')
        }
        else{
            res.send('registration_failed')
        }
    }
}

// Функция для вставки данных
async function insertUser(username, password) {
    return new Promise((resolve, reject) => {
        OpenDatabase('./database/database.db');
        DBrun(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], function(err) {
            if (err) {
                console.error(err.message);
                CloseDatabase();
                resolve({ result: false });
            } else {
                console.log('Row added with ID: ' + this.lastID);
                CloseDatabase();
                resolve({ result: true });
            }
        });
    });
}