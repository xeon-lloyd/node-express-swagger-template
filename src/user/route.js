const express = require('express');
const router = express.Router();

const APIdoc = require('../core/swagger/module.js')

const param = require('./param.js')
const query = require('./query.js')
const body = require('./body.js')
const response = require('./response.js')



/* // 라우팅 명세 // */
APIdoc.POST('/user/login', {
	tag: 'user',
    title: '로그인 요청',
	body: new body.UserLoginPostBody,
    response: [
		new response.LoginFail,
		new response.LoginOK
	]
})
router.post('/login', async function(req, res){
	await require(`./login.js`).exec(req, res);
})


APIdoc.GET('/user/info', {
	tag: 'user',
    title: '로그인 사용자 정보 조회',
	loginRequire: true,
    response: [
		new response.GetUserInfoOK
	]
})
router.get('/info', async function(req, res){
	await require(`./getUserInfo.js`).exec(req, res);
})

/* // 라우팅 명세 끝 // */





module.exports = router;