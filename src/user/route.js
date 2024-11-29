const express = require('express');
const router = express.Router();

const APIdoc = require('../core/swagger/module.js')

const response = require('../response.js')

const param = require('./param.js')
const query = require('./query.js')
const body = require('./body.js')

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


APIdoc.addPath('/user/register', 'post', {
	"tags": [ "user" ],
	"summary": "회원가입 요청",
	"description": "사용자 등록을 위한 회원가입 요청",
	"requestBody": {
		"content": {
		"application/x-www-form-urlencoded": {
			"schema": {
				"type": "object",
				"properties": {
					"id": { 
						"description": "사용자 아이디",
						"type": "string"
				  	},
					"password": {
						"description": "사용자 패스워드",
						"type": "string",
						"format": "password"
					},
					"passwordCheck": {
						"description": "사용자 패스워드 확인",
						"type": "string",
						"format": "password"
					},
					"name": { 
						"description": "사용자 성명",
						"type": "string"
				  	},
					"email": { 
						"description": "사용자 이메일주소",
						"type": "string"
				  	},
					"businessName": { 
						"description": "업체명",
						"type": "string"
				  	},
					"businessNum": { 
						"description": "사업자 등록번호 (-제외)",
						"type": "integer"
				  	},
				},
				"required": [ "id", "password", "passwordCheck", "name", "email", "businessName", "businessNum" ] 
			}
		}
		}
	},
	"responses": {
		"200": {
			"description": "회원가입 성공",
			"content": { "application/json": {}	}
		},
		"400": {
			"description": "회원가입 실패",
			"content": { "application/json": {} }
		}
	}
})
router.post('/register', async function(req, res){
	await require(`.${req.path}.js`).exec(req, res);
})



APIdoc.addPath('/user/information', 'get', {
	"tags": [ "user" ],
	"summary": "사용자 정보 조회",
	"description": "토큰키를 이용해서 사용자 정보 조회",
	"responses": {
		"200": {
			"description": "사용자 정보 조회 성공",
			"content": { "application/json": {}	}
		},
		"401": {
			"description": "로그인 실패",
			"content": { "application/json": {} }
		}
	},
	"security": [{
		"Token-Key": []
	}]
})
router.get('/information', async function(req, res){
	await require(`.${req.path}-get.js`).exec(req, res);
})


APIdoc.addPath('/user/information', 'patch', {
	"tags": [ "user" ],
	"summary": "회원정보 수정 요청",
	"description": "토큰키에 해당하는 회원의 정보를 수정",
	"requestBody": {
		"content": {
		"application/x-www-form-urlencoded": {
			"schema": {
				"type": "object",
				"properties": {
					"id": { 
						"description": "사용자 아이디",
						"type": "string"
				  	},
					"password": {
					"description": "기존 패스워드",
						"type": "string",
					"format": "password"
					},
					"newPassword": {
						"description": "새로운 패스워드",
						"type": "string",
						"format": "password"
					},
					"newPasswordCheck": {
						"description": "새로운 패스워드 확인",
						"type": "string",
						"format": "password"
					},
					"name": { 
						"description": "사용자 성명",
						"type": "string"
				  	},
					"email": { 
						"description": "사용자 이메일주소",
						"type": "string"
				  	},
					"businessName": { 
						"description": "업체명",
						"type": "string"
				  	},
					"profilePhoto": { 
						"description": "프로필 사진",
						"type": "file"
				  	},
				},
				"required": [ "id", "password", "newPassword", "newPasswordCheck", "name", "email", "businessName" ] 
			}
		}
		}
	},
	"responses": {
		"200": {
			"description": "회원가입 성공",
			"content": { "application/json": {}	}
		},
		"400": {
			"description": "회원가입 실패",
			"content": { "application/json": {} }
		}
	},
	"security": [{
		"Token-Key": []
	}]
})
router.patch('/information', async function(req, res){
	//await require(`.${req.path}-post.js`).exec(req, res);
})


module.exports = router;