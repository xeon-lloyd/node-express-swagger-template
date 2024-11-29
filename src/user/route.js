const express = require('express');
const router = express.Router();

const APIdoc = require('../core/swagger/module.js')

const param = require('./param.js')
const query = require('./query.js')
const body = require('./body.js')
const response = require('../response.js')



/* // 라우팅 명세 // */
APIdoc.POST('/user/login', {
	tag: 'user',
    title: '로그인 요청',
	body: new body.UserLoginPostBody,
    response: [
		new response.APINotFound
	]
})
router.post('/login', async function(req, res){
	await require(`.${req.path}.js`).exec(req, res);
})

/* // 라우팅 명세 끝 // */





module.exports = router;