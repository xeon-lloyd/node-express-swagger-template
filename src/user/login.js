const util = require('../core/util.js')

const response = require('./response.js')

module.exports = {
	exec: async function(req, res){
		// let [ info ] = await util.mysql.select(
        //     'inven',
        //     'id, password, uid',
        //     'user',
        //     'id=?',
        //     [ req.body.id ]
        // )
        info = 20

        if(!info) return res.status(400).send(new response.LoginFail)

		res.status(200).send(new response.LoginOK);
	}
}
