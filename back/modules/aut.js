const CryptoJS = require('crypto-js')
const connection = require('./db_mysql')
const {KEY} = require('./key')

module.exports = {
    aut: async (req, res) => {
        const aut_data = req.body;
        console.log()
        try {
            const response = await checkUser(aut_data.username);
            console.log(`С базы данных: ${response.password}`);
            console.log(`С клиента: ${aut_data.password}`)
            if(response === 'no_user_exists'){
                res.send('Данного пользователя не существует');
            }
            else{
                const decrypt_pass_db = CryptoJS.AES.decrypt(response.password, KEY()).toString(CryptoJS.enc.Utf8)
                if (aut_data.password === decrypt_pass_db) {
                    res.send(['Авторизация прошла успешно', response.balance]);
                }
                else {
                    res.send('Неверный пароль');
                }
            }
            
        } 
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
};


async function checkUser(username) {
    try {
        const [rows] = await connection.promise().query("SELECT password, balance FROM users WHERE username = ?", [username]);
        console.log(rows)
        if (rows.length === 0) {
            console.log('no_user_exists')
            return 'no_user_exists'
        } else {
            console.log(`def - ${rows[0].balance}`)
            console.log(`def - ${rows[0].password}`)
            return {password: rows[0].password, balance: rows[0].balance}
        }
    } catch (err) {
        console.error('Ошибка при выполнении запроса:', err.message);
        throw err;
    }
}