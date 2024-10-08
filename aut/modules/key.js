const key = '1IChqk%$1l0HQPfU0qQl1phgm#Ssq94H'
module.exports = {
    getKey: async function(req, res){
        res.send(key)
    },
    KEY: function(){
        return key
    }
}

