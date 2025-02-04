const setting = {
	AppName: 'template',
	hostName: 'http://localhost',
	
	port: 80,

	isProduction: false,

	mysql: {
        'database1': { //alias
		    host: 'db1.server.host',
		    user: 'dbUser1',
		    password: 'dbPass1',
			database: 'DBName'
	    },
        'database2': { //alias
		    host: 'db2.server.host',
		    user: 'dbUser2',
		    password: 'dbPass2',
			database: 'DBName'
	    }
	},
	sqlCamelToSnakeMapping: true,

	s3: {
        accessKeyId: 's3 accessKeyId',
        secretAccessKey: 's3 secretAccessKey',
		region: 'ap-northeast-1',
		endpoint: '',
		buckets: {

		}
    },

	fileUpload: {
		limitSize: 5 * 1000 * 1000, // 5mb
		tempBucket: 'upload-temp',		
	},

	gmailSmtp: {
		user: 'user@gmail.com',
		fromEmail: 'custom-user@gmail.com',
		clientId: 'google-api-clientId.apps.googleusercontent.com',
		clientSecret: 'google-api-clientSecret',
		accessToken: 'aa00.access_token',
		refreshToken: '1//refresh-token',
		fromEmail: 'user@gmail.com'
	},

	encrypt: {
		key: 'encryptkeyString',
	},

	token: {
		enableTimeExpire: false,
		expire: 3 * 24 * 60 * 60 //s
	},

	redis: {
		host: 'localhost',
		port: 6379,
		password: '',
	},

	socket: {
		redisAdapter: {
			enable: true,
			redis: {
				host: 'localhost',
				port: 6379,
				password: '',
			},
		}
	}
}

module.exports = setting;