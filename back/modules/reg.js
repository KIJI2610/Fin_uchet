const connection = require('./db_mysql')


module.exports = {
    reg: async (req, res) => {
        const reg_data = req.body
        let response
        if(reg_data.username.length < 2){
            res.send('Имя пользователя слишком короткое')
        }
        else{
            response = await insertUser(reg_data.username, reg_data.password)
            if(response.result === true){
                res.send('registration_was_successful')
            }
            else{
                res.send('registration_failed')
            }
        }
    }
}
// Функция для вставки данных
async function insertUser(username, password) {
    return new Promise((resolve, reject) => {

        connection.query(`INSERT INTO users (username, password, balance) VALUES (?, ?, ?)`, [username, password, 0.0], function(err, result) {
          if (err) {
            console.error('Ошибка при выполнении запроса:', err.message);
            resolve({ result: false, error: err.message });
          } else {
            console.log('Row added with ID: ' + result.insertId);
            resolve({ result: true, insertId: result.insertId });
          }
        });
        
    });
}
