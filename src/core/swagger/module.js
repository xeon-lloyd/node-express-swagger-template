const valider = require('../valider.js')

const dto = require('./dto.js')


function mapOption(data){
    let key = Object.keys(dto.defaultOption)
    key.forEach(prop => {
        if(data[prop]==undefined) data[prop] = dto.defaultOption[prop]
    })

    return data
}

const addPath = function(method, path, option=dto.defaultOption){
    // 경로 설정
    let pathOption = global.swagger.paths;
    if(!pathOption[path]) pathOption[path] = {}


    // 문서 데이터
    option = mapOption(option)

    // data schme
    let data = {
        tags: [ option.tag ],
        summary: option.title,
        responses: {}
    }


    // response
    option.response.forEach(res => {
        let example = data.responses[res.response]?.content["application/json"]?.examples || {}
        example[res.responseCode] = {
            value: res
        }

        data.responses[res.response] = {
            content: {
                "application/json": {
                    examples: example
                }
            }
        }
    });


    // loginRequire
    if(option.loginRequire) data.security = [{
        Authorization: []
    }]


    // param
    if(!valider.isEmptyObject(option.param)){
        data.parameters = []

        let keys = Object.keys(option.param)
        keys.forEach(prop => {
            let info = option.param[prop].split('(')
            let type = info?.pop()?.replace(')', '') || ''
            let description = info.join('')

            data.parameters.push({
                in: "path",
                required: true,
                name: prop,
                description: description,
                required: !(type.indexOf('?') > -1),
                schema: {
                    type: type.replace('?', '')
                }
            })
        })
    }


    // query
    if(!valider.isEmptyObject(option.query)){
        if(data.query==undefined) data.parameters = []

        let keys = Object.keys(option.query)
        keys.forEach(prop => {
            let info = option.query[prop].split('(')
            let type = info?.pop()?.replace(')', '') || ''
            let description = info.join('')

            data.parameters.push({
                in: "query",
                required: true,
                name: prop,
                description: description,
                required: !(type.indexOf('?') > -1),
                schema: {
                    type: type.replace('?', '')
                }
            })
        })
    }


    // body
    let requestBody = {
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {}
                }
            }
        }
    }
    if(!valider.isEmptyObject(option.body)){
        let keys = Object.keys(option.body)
        keys.forEach(prop => {
            requestBody.content["application/json"].schema.properties[prop] = {
                type: typeof option.body[prop],
                example: option.body[prop]
            }
        })

        data.requestBody = requestBody
    }

    pathOption[path][method] = data;
}

module.exports = {
    addTag: function(data){
        global.swagger.tags.push(data);
    },

    POST: function(path="", option=dto.defaultOption){
        addPath('post', path, option)
    },

    GET: function(path="", option=dto.defaultOption){
        addPath('get', path, option)
    },

    PUT: function(path="", option=dto.defaultOption){
        addPath('put', path, option)
    },

    DELETE: function(path="", option=dto.defaultOption){
        addPath('delete', path, option)
    },

    PATCH: function(path="", option=dto.defaultOption){
        addPath('patch', path, option)
    }
}
