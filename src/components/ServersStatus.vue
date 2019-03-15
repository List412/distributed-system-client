<template>
    <div>
        <div>
            <form class="form-group">
                <label>server url
                    <input placeholder="https://site.ru" class="form-control" v-model="host">
                </label>
                <input type="button" value="Add" class="btn btn-primary" v-on:click="add_server">
            </form>
        </div>
        <div v-for="item in servers">
            <li>{{ item.address }}</li>
            <button class="btn-danger" v-on:click="delete_server(item.id)">Delete</button>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../main'
    export default {
        name: "ServersStatus",
        data() {
            return {
                servers: [],
                host: ''
            }
        },
        methods: {
            load_servers: function () {
                HTTP.get('/status')
                    .then((result) => {
                        this.servers = result.data
                    })
            },
            delete_server(id) {
              HTTP.delete('/status/'+id)
            },
            add_server() {
                // if (this.isUrl(this.host)) {
                //     alert("invalid url")
                //     return
                // }
                HTTP.post('/status', { "host": this.host }, {
                    headers: { "Content-Type": "application/json; charset=utf-8" }
                } )
            },
            isUrl: function (str) {
                const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                return pattern.test(str);
            }
    },
        created() {
            this.load_servers()
        }
    }
</script>

<style scoped>

</style>
