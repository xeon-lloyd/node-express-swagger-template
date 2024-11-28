const rootResponse = require('./response.default.js')

module.exports = {
    'APINotFound': class APINotFound extends rootResponse.NotFound {
        message = "해당 API를 찾을 수 없습니다"
        responseCode = "APINotFound"
    }
}