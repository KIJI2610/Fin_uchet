const {OpenDatabase, CloseDatabase} = require('./db')

module.exports = {
    aut: async (req, res) => {
        OpenDatabase('./../database/database.db')
        const aut_data = req.body
        
    }
}