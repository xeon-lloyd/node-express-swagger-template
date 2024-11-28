const util = require('../core/util.js')

module.exports = {
	exec: async function(req, res){
        let result;

		let [ info ] = await util.mysql.select(
            'inven',
            'id, password, uid',
            'user',
            'id=?',
            [ req.body.id ]
        )

        if(!info){
            result = {
                result: 400,
                message: '해당 아이디를 찾을 수 없습니다',
                response: null,
            }

            res.status(400).send(result)
            return;
        }

        if(info.password!=util.encrypt.oneWay(req.body.password)){
            result = {
                result: 400,
                message: '패스워드가 일치하지 않습니다',
                response: null,
            }

            res.status(400).send(result)
            return;
        }

        
        result = {
            result: 200,
            message: '로그인에 성공했습니다',
            response: {
                token: util.session.compose(info.uid)
            },
        }

		res.status(200).send(result);
	}
}
