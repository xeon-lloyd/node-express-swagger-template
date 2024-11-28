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
    body: {},
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

        let response = {}
        option.response.forEach(res => {
            let example = {}
            example[res.responseCode] = {
                value: res
            }

            response[res.responseCode] = {
                content: {
                    "application/json": {
                        examples: example
                    }
                }
            }
        });


        let security = []
        if(option.loginRequire) security = [{
            Authorization: []
        }]
        

        let data = {
            tags: [ option.tag ],
            summary: option.title,
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: 'object',
                            properties: {
                                "id": { 
                                    type: "string",
                                    examples: '흠흐밍'
                                },
                                password: {
                                    "type": "string",
                                }
                            },
                        }
                    }
                }
            },
            responses: response,
            security
        }

        addPath('post', path, data)
    }
}
