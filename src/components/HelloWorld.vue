<template>
  <div class="hello">
    <picture-input
            ref="pictureInput"
            accept="image/jpeg,image/png,image/jpg"
            width="600"
            height="400"
            button-class="btn"
            :custom-strings="{
            upload: '<h1> Loading </h1>',
            drag: 'Drag img here pls' }"
            @change="onChangeLoad"
    >
    </picture-input>

      <a v-if="isSuccess" :href="url">{{ url }}</a>

    <!--<div class="container">-->
      <!--<form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">-->
        <!--<h1>Upload images</h1>-->
        <!--<div class="dropbox">-->
          <!--<input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"-->
                 <!--accept="image/*" class="input-file">-->
          <!--<p v-if="isInitial">-->
            <!--Drag your file(s) here to begin<br> or click to browse-->
          <!--</p>-->
          <!--<p v-if="isSaving">-->
            <!--Uploading {{ fileCount }} files...-->
          <!--</p>-->
        <!--</div>-->
      <!--</form>-->
      <!--&lt;!&ndash;SUCCESS&ndash;&gt;-->
      <!--<div v-if="isSuccess">-->
        <!--<h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>-->
        <!--<p>-->
          <!--<a href="javascript:void(0)" @click="reset()">Upload again</a>-->
        <!--</p>-->
        <!--<ul class="list-unstyled">-->
          <!--<li v-for="item in uploadedFiles">-->
            <!--<img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--&lt;!&ndash;FAILED&ndash;&gt;-->
      <!--<div v-if="isFailed">-->
        <!--<h2>Uploaded failed.</h2>-->
        <!--<p>-->
          <!--<a href="javascript:void(0)" @click="reset()">Try again</a>-->
        <!--</p>-->
        <!--<pre>{{ uploadError }}</pre>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import { HTTP } from "@/main";

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
import PictureInput from "vue-picture-input"
export default {
  name: 'HelloWorld',
  components: {PictureInput},
  data() {
    return {
      picture: {},
      name: '',
        url: '',
      totalImages: [],
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'photos',
      fileCount: 0,
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    onChangeLoad() {
      console.log("New picture selected!");
      this.currentStatus = STATUS_SAVING
      if (this.$refs.pictureInput.image) {
        console.log("Picture loaded.");
        this.picture = this.$refs.pictureInput.image
          this.name = this.$refs.pictureInput.fileName
          this.upload(this.name, this.picture)
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save: function (name, base64) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;
    },

    filesChange: async function (fieldName, fileList) {

      if (!fileList.length) return;
      this.fileCount = fileList.length

      for (let i = 0; i < fileList.length; i++) {
        let file = await this.getBase64(fileList[i])

        this.upload(file.name, file.base64).then(
            this.pushto(file)
        )
      }
    },
      getBase64: function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
              let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                  encoded += '='.repeat(4 - (encoded.length % 4));
              }
              resolve({name: file.name, base64: encoded});
          };
          reader.onerror = error => reject(error);
      });
    },
      upload: async function(name, base64) {
          return HTTP.get('/api/server')
              .then(x => {
                  return HTTP.post(x.data + '/api/pictures', {
                      Name: name, File: base64
                  })
                      .then(y => {
                          this.url = 'https://share-image.herokuapp.com/#/pictures/' + y.data
                          this.currentStatus = STATUS_SUCCESS
                      })
              })
      }
  },
  mounted() {
    this.reset();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
