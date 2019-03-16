import {HTTP} from './main'

function upload(name, base64) {
    return HTTP.post('/api/pictures', {
        Name: name, File: base64
    })
        .then(x => x.data)
}

export { upload }
