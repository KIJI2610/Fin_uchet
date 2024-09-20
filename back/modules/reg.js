const connection = require('./db_mysql')
const {KEY} = require('./key')
const CryptoJS = require('crypto-js')

const message = 'Пароль должен содержать минимум одну заглавную и строчную букву \nА так же один из перечисленных символов: "@#$&?"'

module.exports = {
    reg: async (req, res) => {
        const reg_data = req.body
        let response
        const decrypt_pass_client = CryptoJS.AES.decrypt(reg_data.password, KEY()).toString(CryptoJS.enc.Utf8)

        if(reg_data.username.length < 2){
            res.send('Имя пользователя слишком короткое')
        }
        else if(reg_data.username.length > 30){
            res.send('Имя пользователя слишком длинное')
        }
        else if(decrypt_pass_client.length < 10){
            res.send('Минимальная длина пароля 10 символов')
        }
        else if(decrypt_pass_client.length > 32){
            res.send('Максимальная длина пароля 32 символа')
        }
        else {
            const VALID_PASSWORD = validPassword(decrypt_pass_client)
            if(VALID_PASSWORD){
                response = await insertUser(reg_data.username, reg_data.password)
                if(response.result === true){
                    res.send('registration_was_successful')
                }
                else{
                    res.send('registration_failed')
                }
            }
            else{
                res.send(message)
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

const compulsory_chars = ['@', '#', '$', '&', '?']
const lowercaseLetters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]
const uppercaseLetters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]


function validPassword(password_client){
    const valid_chars = compulsory_chars.filter(element => password_client.includes(element))
    const valid_lowercase_letters = lowercaseLetters.filter(element => password_client.includes(element))
    const valid_uppercase_letters = uppercaseLetters.filter(element => password_client.includes(element))
    if(valid_chars.length > 0 && valid_lowercase_letters.length > 0 && valid_uppercase_letters.length > 0){
        return true
    }
    else{
        return false
    }
}

