<template>
    <img v-bind:src="'data:image/jpeg;base64,'+imageBytes" />
</template>

<script>
    import {HTTP} from "@/main";

    export default {
        name: "PictureViewComponent",
        data() {
            return {
                imageBytes: ''
            }
        },
        methods: {
            load: function () {
                return HTTP.get('/api/pictures/'+this.$route.params.id)
                    .then (x => {
                    this.imageBytes = JSON.parse(x.data)[0].file.replace('data:image/png;base64,', '')
                    })
            }
        },
        mounted() {
            this.load()
        }
    }
</script>

<style scoped>

</style>
