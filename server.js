const express = require('express');
const app = express();
const server = require('http').createServer(app);

const setting = require('./setting.js')

app.use(express.json({ limit: '50mb', extended: true })); 

/* API 요청 라우팅 */
app.use('/api', require('./src/route.js'));


server.listen(setting.port, function(){
	console.log(`${setting.port}포트에서 서버 구동중`)
})