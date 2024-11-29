const util = require('../core/util.js')

const response = require('./response.js')

module.exports = {
	exec: async function(req, res){
		res.status(200).send(new response.GetUserInfoOK({ a: "흠밍이" }));
	}
}
