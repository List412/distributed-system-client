<template>
    <div id='server'>
        <div>
            <form class="form-group">
                <label>You can manage host servers here
                    <input placeholder="https://site.ru" class="form-control" v-model="host">
                </label>
                <input type="button" value="Add" class="btn btn-primary" v-on:click="add_server">
            </form>
        </div>
        <div id="server-list">
          <table>
            <tr>
              <th>
                Address
              </th>
              <th>
                Active
              </th>
              <th>
                Last activity
              </th>
              <th>
                Load
              </th>
              <th>
                Ping
              </th>
            </tr>
            <tr v-for="item in servers">
              <td>
                {{ item.address }}
              </td>
              <td>
                {{ item.isActive }}
              </td>
              <td>
                {{ item.last }}
              </td>
              <td>
                {{ item.load }}
              </td>
              <td>
                {{ item.ping }}
              </td>
              <td>
                <button class="btn-danger" v-on:click="delete_server(item.id)">Delete</button>
              </td>
            </tr>
          </table>
        </div>
    </div>
</template>

<script>
    import {HTTP} from '../main' // отсюда берется HTTP чтобы он существовал в этом файле.
    export default {
        name: "ServersStatus",
        data() {
            return { // тут всякие переменные обхявляются. Их можно использовать в template и во всяких методах и прочем.
                servers: [],
                host: ''
            }
        },
        methods: { // HTTP это axios, библиотека для http запросов.
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
        created() { // вызывается когда этот компоннт создается. Ну например когда страничка загружается.
            this.load_servers()
        }
    }
</script>

<style scoped>

#server
{
  margin-top:20px;
}

.btn-primary{
  margin-left:15px;
}

#server-list>table
{
  margin:auto;
}

#server-list>table>tr>td, #server-list>table>tr>th
{
  padding: 10px;
}
</style>
