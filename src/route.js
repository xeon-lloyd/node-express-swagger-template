const express = require('express');
const router = express.Router();

const { swaggerUi, specs } = require("./core/swagger/swagger.js")
const APIdoc = require('./core/swagger/module.js')

const response = require('./response.js');
const setting = require('../setting.js');


/* // 라우팅 명세 // */
/* USER 그룹 */
APIdoc.addTag({
    name: 'user',
    description: '유저 관련 API 그룹'
})
router.use('/user', require('./user/route.js'));

/* // 라우팅 명세 끝 // */



/* API 없을때 */
router.use(function(req, res, next){
    /* swagger 관련 요청이면 해당 로직 작동 */
    if(req.path.indexOf('swagger-ui')>-1 || req.path=='/'){
        return next();
    }

	res.status(404).send(new response.APINotFound);
})


/* API 문서 (index) */
if(!setting.isProduction) router.use("/", swaggerUi.serve, swaggerUi.setup(specs))

module.exports = router;