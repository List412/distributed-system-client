<template>
    <img v-bind:src="imageBytes" />
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
                    this.imageBytes = JSON.parse(x.data).file
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
