const util = require('../core/util.js')

module.exports = {
	exec: async function(req, res){
        let count;

        /* 필수입력 체크 */
        let result = {
            result: 400,
            message: ' 필수입력 항목입니다',
            response: null
        }

        if(!req.body.id){
            result.message = '아이디는' + result.message;
            res.status(400).send(result)
            return;
        }

        if(!req.body.password){
            result.message = '패스워드는' + result.message;
            res.status(400).send(result)
            return;
        }

        if(!req.body.passwordCheck){
            result.message = '패스워드 확인은' + result.message;
            res.status(400).send(result)
            return;
        }

        if(!req.body.name){
            result.message = '성명은' + result.message;
            res.status(400).send(result)
            return;
        }

        if(!req.body.email){
            result.message = '이메일은' + result.message;
            res.status(400).send(result)
            return;
        }

        if(!req.body.businessName){
            result.message = '업체명은' + result.message;
            res.status(400).send(result)
            return;
        }

        if(!req.body.businessNum){
            result.message = '사업자 등록번호는' + result.message;
            res.status(400).send(result)
            return;
        }


        /* 아이디 유효 확인(영소문자 + 숫자 5글자 이상 | 20글자 이하) */
        if(!/^[a-z]+[a-z0-9]{4,19}$/.test(req.body.id)){
            result.message = '아이디가 조건에 부합하지 않습니다';
            res.status(400).send(result)
            return;
        }

        count = await util.mysql.count(
            'inven',
            'user',
            'id=?',
            [ req.body.id ]
        )
        if(count){
            result.message = '이미 해당 아이디가 존재합니다';
            res.status(400).send(result)
            return;
        }


        /* 비밀번호 유효 확인(영소문자 + 숫자 + 특수문자 8글자 이상) */
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/.test(req.body.password)){
            result.message = '비밀번호가 조건에 부합하지 않습니다';
            res.status(400).send(result)
            return;
        }

        /* 비밀번호 재입력 확인 */
        if(req.body.password != req.body.passwordCheck){
            let result = {
                result: 400,
                message: '비밀번호와 비밀번호 확인이 일치하지 않습니다',
                response: null
            }

            res.status(400).send(result)
            return;
        }


        /* 이메일 유효 확인 */
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)){
            let result = {
                result: 400,
                message: '유효하지 않은 이메일 주소입니다',
                response: null
            }

            res.status(400).send(result)
            return;
        }

        count = await util.mysql.count(
            'inven',
            'user',
            'email=?',
            [ req.body.email ]
        )
        if(count){
            result.message = '이미 해당 이메일로 가입된 계정이 존재합니다';
            res.status(400).send(result)
            return;
        }
        

        /* 사업자 등록번호 유효 확인 */
        if(!/^[0-9]{10,10}$/.test(req.body.businessNum)){
            let result = {
                result: 400,
                message: '사업자 등록번호 형식에 어긋납니다 (숫자 10글자)',
                response: null
            }

            res.status(400).send(result)
            return;
        }

        count = await util.mysql.count(
            'inven',
            'user',
            'businessNum=?',
            [ req.body.businessNum ]
        )
        if(count){
            result.message = '이미 해당 사업자 등록번호로 가입된 계정이 존재합니다';
            res.status(400).send(result)
            return;
        }

        

        
        /* uid 생성 */
        let UID;
        do{
            let key = parseInt(Math.random() * 89999 + 10000);
            UID = '1' + new Date().stringFormat(`ymd${key}`).substr(-10);

            count = await util.mysql.count(
                'inven',
                'user',
                'uid=?',
                [ UID ]
            )
        }while(count>0)


        /* DB에 들어갈 데이터셋 생성 */
        let data = {
            uid: UID,
            id: req.body.id,
            password: util.encrypt.oneWay(req.body.password),
            name: req.body.name,
            email: req.body.email,
            businessName: req.body.businessName,
            businessNum: req.body.businessNum
        }
        
        await util.mysql.insert(
            'inven',
            'user',
            data
        )

		result = {
            result: 200,
            message: '회원가입이 완료되었습니다',
            response: null
        }

		res.status(200).send(result);
	}
}
