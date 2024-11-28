const util = require('../core/util.js')

module.exports = {
	exec: async function(req, res){
        let result = {
            result: 401,
            message: '토큰이 유효하지 않습니다',
            response: null
        }

        let token = req.get('Token-Key');
        if(!token){
            res.status(401).send(result);
            return;
        }
        
        let UID;
        try{
            UID = util.session.decode(token).uid;
        }catch(e){
            res.status(401).send(result);
            return;
        }
        
        let [ info ] = await util.mysql.select(
            'inven',
            'uid, id, name, email, businessName, businessNum',
            'user',
            'uid=?',
            [ UID ]
        );

        if(!info){
            res.status(401).send(result);
            return;
        }

        result = {
            result: 200,
            message: '유저 정보 조회에 성공했습니다',
            response: info
        }
        res.status(200).send(result);

	}
}
