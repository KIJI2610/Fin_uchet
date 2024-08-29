const {OpenDatabase, CloseDatabase, DBall} = require('./db')

module.exports = {
    aut: async (req, res) => {
        const aut_data = req.body
        checkUser(aut_data.username)
        
    }
}
checkUser('username')
async function checkUser(username) {
    OpenDatabase('./../database/database.db')
    DBall("SELECT password FROM users WHERE username=?", [username], (err, rows) => {
        console.log(rows)
    })
    CloseDatabase()
}