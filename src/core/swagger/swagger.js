const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const setting = require("../../../setting.js")

const port = setting.port!=80 ? `:${setting.port}` : ''
const envStr = setting.isProduction ? '프로덕션' : '개발'

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
        "title": `${setting.AppName} API`,
        "description": `${setting.AppName} 서비스에 제공되는 API`,
        "version": "proto_0.1"
    },
    servers: [
        {
          "url": `${setting.hostName}${port}/API`,
          "description": `${envStr} 서버 API URL`
        }
    ],
    basePath: '/',
    components: {
        securitySchemes: {
            'Authorization': {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        }
    }
  },
  apis: []
}
const specs = swaggereJsdoc(options)
global.swagger = specs;

module.exports = { swaggerUi, specs }
