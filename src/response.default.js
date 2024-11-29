module.exports = {
    'OK': class {
        constructor(data, message) {
            this.data = data || null;
            this.message = message || "success";
        }

        response = 200;
        message = "";
        responseCode = "OK";
        target = null;
        data = null;
    },

    'BadRequest': class {
        constructor(responseCode, message) {
            this.responseCode = responseCode || null;
            this.message = message || "Bad Request";
        }

        response = 400;
        message = "";
        responseCode = "BadRequest";
        target = null;
        data = null;
    },

    'Unauthorized': class {
        constructor(responseCode, message) {
            this.responseCode = responseCode || null;
            this.message = message || "로그인이 필요합니다";
        }

        response = 401;
        message = "";
        responseCode = "Unauthorized";
        target = null;
        data = null;
    },
    
    'Forbidden': class {
        constructor(responseCode, message) {
            this.responseCode = responseCode || null;
            this.message = message || "Forbidden";
        }

        response = 403;
        message = "";
        responseCode = "Forbidden";
        target = null;
        data = null;
    },

    'NotFound': class {
        constructor(responseCode, message) {
            this.responseCode = responseCode || null;
            this.message = message || "Not found";
        }

        response = 404;
        message = "";
        responseCode = "NotFound";
        target = null;
        data = null;
    },

    'MethodNotAllowed': class {
        constructor(responseCode, message) {
            this.responseCode = responseCode || null;
            this.message = message || "Method Not Allowed";
        }

        response = 405;
        message = "";
        responseCode = "MethodNotAllowed";
        target = null;
        data = null;
    },

    'InternalServerError': class {
        constructor(responseCode, message) {
            this.responseCode = responseCode || null;
            this.message = message || "Internal Server Error";
        }

        response = 500;
        message = "";
        responseCode = "InternalServerError";
        target = null;
        data = null;
    }
}