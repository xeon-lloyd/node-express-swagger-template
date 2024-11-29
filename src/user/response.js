const rootResponse = require('../response.default.js')

module.exports = {
    LoginFail: class LoginFail extends rootResponse.BadRequest {
        message = "로그인 실패"
        responseCode = "LoginFail"
    },

    LoginOK: class LoginOK extends rootResponse.OK {
        message = "로그인 성공"
        responseCode = "LoginOK"
    },

    GetUserInfoOK: class GetUserInfoOK extends rootResponse.OK {
        constructor(data){
            super()
            if(data!=undefined) this.data = data
        }

        message = "로그인 사용자 정보 조회 성공"
        responseCode = "GetUserInfoOK"
        data = {
            id: "흠흐밍",
            name: "홈호밍",
            list: [
                "아니 이게 이렇게 잘되는데"
            ],
            obj: {
                hello: 13
            }
        }
    }
}