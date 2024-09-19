const key = '12345678'
module.exports = {
    getKey: async function(req, res){
        res.send(key)
    },
    KEY: function(){
        return key
    }
}

