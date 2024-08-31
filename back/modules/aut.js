const {OpenDatabase, CloseDatabase, DBall} = require('./db')

module.exports = {
    aut: async (req, res) => {
        const aut_data = req.body
        try {
            const response = await checkUser(aut_data.username)
            console.log(response)
            console.log(response[0].password)
            if(response[0].password === aut_data.password){
                res.send('Авторизация прошла успешно')
            }
            else if(response[0].password !== aut_data.password && response !== 'no_user_exists'){
                res.send('Неверный пароль')
            }
            else{
                res.send('Данного пользователя не существет')
            }
            
            
        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }
}

async function checkUser(username) {
    return new Promise((resolve, reject) => {
        OpenDatabase('./database/database.db');
        DBall("SELECT password FROM users WHERE username=?", [username], (err, rows) => {
            if (err) {
                CloseDatabase()
                return reject(err)
            }
            let result;
            if (rows.length === 0) {
                result = 'no_user_exists'
            } 
            else {
                result = rows
            }
            CloseDatabase()
            resolve(result)
        })
    })
}