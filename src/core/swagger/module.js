const valider = require('../valider.js')

const addPath = function(method, path, data){
    let pathOption = global.swagger.paths;
    if(!pathOption[path]) pathOption[path] = {}

    pathOption[path][method] = data;
}

const defaultOption = {
    title: 'title',
    loginRequire: false,
    query: {},
    param: {},
    body: {}, // 일반 dto class 그대로
    response: []
}

function mapOption(data){
    let key = Object.keys(defaultOption)
    key.forEach(prop => {
        if(data[prop]==undefined) data[prop] = defaultOption[prop]
    })

    return data
}

module.exports = {
    addTag: function(data){
        global.swagger.tags.push(data);
    },

    addPath,

    POST: function(path="", option=defaultOption){
        option = mapOption(option)

        // data schme
        let data = {
            tags: [ option.tag ],
            summary: option.title,
            responses: {}
        }


        // response
        option.response.forEach(res => {
            let example = {}
            example[res.responseCode] = {
                value: res
            }

            data.responses[res.responseCode] = {
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

        addPath('post', path, data)
    }
}
