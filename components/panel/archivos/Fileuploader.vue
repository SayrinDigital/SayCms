<template>

  <div>

    <div id="modal-fileuploader" ref="modal" uk-modal>
    <div class="uk-modal-dialog say-background-theme-a uk-modal-body">
      <div>
        <div class="uk-margin">
          <input type="text" placeholder="Nombre" class="uk-input uk-form-large" name="" value="" v-model="filename">
        </div>
        <div class="uk-margin">
          <div class="uk-width-1-1" uk-form-custom="target: true">
              <input type="file" ref="file" v-on:change="handleFileUpload()">
              <input class="uk-input uk-form-large uk-width-1-1" type="text" placeholder="Elegir Archivo" disabled>
          </div>
        </div>
        <div class="uk-margin uk-text-right">
          <button class="uk-button theme-a" v-on:click="submitFile()">Subir</button>
        </div>
        <progress ref="progressbar" id="js-progressbar" class="uk-progress" value="0" max="100"></progress>
      </div>
    </div>
</div>

  </div>

</template>

<script>

import axios from 'axios'
import UIkit from 'uikit'

export default {
  data(){
    return{
      title: null,
      image: null,
      file: null,
      progressbar: null,
      filename: null,
      submitted: false,
      modal: null
    }
  },
  mounted() {

            this.progressbar = this.$refs.progressbar
            this.modal = this.$refs.modal

    axios
      .get('http://localhost:8000/media_objects')
      .then(response => (this.info = response.data._embedded.item))
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {

      var self = this;

      let formData = new FormData();

      /*
          Add the form data we need to submit
      */
      formData.append('assetFile', this.file)
      formData.append('name', this.filename)
      formData.append('size', this.file.size)
      formData.append('type', this.file.type);

      /*
        Make the request to the POST /single-file URL
      */
      axios.post('http://localhost:8000/media_objects',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              self.progressbar.value = percentCompleted;
            }
          }
        ).then(function(response) {

          UIkit.notification("Enhorabuena! Archivo subido satisfactoriamente", {
            status: 'primary'
          })

            self.progressbar.value = 0;
            UIkit.modal(self.modal).hide()

            var newItem = response.data

            self.emit(newItem)


        })
        .catch(function(response) {
          console.log(response);
        });
    },
    emit(value) {
      var newItem = {
        name : "Hola",
        size : 2000000,
        type : "image/jpeg",
        id: 100
      }
			this.$emit('event_child', value)
		}
  },
}
</script>
