import {HTTP} from './main'

function upload(name, base64) {
    return HTTP.get('/api/server')
        .then(x => {
            return HTTP.post(x.data + '/api/pictures', {
                Name: name, File: base64
            })
                .then(y => y.data)
        })
}

export { upload }
