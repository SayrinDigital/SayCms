<template>

<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Interfaz | Encabezados</h3>
            <p>Administre los encabezados de su sito web.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #add-header"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Encabezado</button>
        </div>
      </div>
    </nav>

    <hr class="uk-hr">

    <div class="uk-section uk-section-small">
      <h4>Listado de Encabezados</h4>

      <div class="uk-section uk-section small">

        <transition-group name="fade" tag="div" class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
          <div v-for="header in headers" :key="header.id">

            <div class="uk-border-rounded uk-overflow-hidden uk-position-relative uk-box-shadow-hover-large ">
              <div v-if="header.cover" :data-src="baseUrl + header.cover.url" uk-img class="uk-background-cover card-container uk-inline-clip uk-transition-toggle" tabindex="0">
                <div class="say uk-transition-slide-bottom uk-position-bottom uk-overlay">
                  <div class="uk-align-right">
                    <ul class="uk-iconnav">
                      <!--<li><a @click="editAd(ad)" href="#" uk-icon="icon: file-edit"></a></li>-->
                      <li><a @click="deleteHeader(header.id, header)" href="#" uk-icon="icon: trash"></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="footer uk-background-default uk-card-body">
                <div>
                  <h4>{{ header.title }}</h4>
                  <p>{{ header.description | truncate(40) }}</p>
                  <p>{{ header.linkto }}</p>
                </div>
              </div>
            </div>

          </div>
        </transition-group>

      </div>

    </div>

    <!-- Modal Ad Add-->
    <div ref="headermodal" id="add-header" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Agregar Encabezado</h2>
          <p>Agrega un nuevo encabezado.</p>

          <form class="uk-form-stacked uk-margin">
      <div class="uk-margin">
          <label class="uk-form-label">Titulo</label>
          <div class="uk-form-controls">
              <input class="uk-input uk-form-large" v-model="title"  type="text" placeholder="Titulo">
          </div>
      </div>
      <div class="uk-margin">
          <label class="uk-form-label">Subtitulo</label>
          <div class="uk-form-controls">
              <input class="uk-input uk-form-large" v-model="subtitle"  type="text" placeholder="Subtitulo">
          </div>
      </div>
      <div class="uk-margin">
          <div class="uk-form-label">Link de Destino</div>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="linkto"  placeholder="Link de destino"/>
          </div>
      </div>
      <div class="uk-margin">
          <div class="uk-form-label">Contenido</div>
          <div class="uk-form-controls">
            <textarea class="uk-textarea uk-form-large" v-model="content"  placeholder="..."></textarea>
          </div>
      </div>
      <div class="uk-margin" uk-margin>
        <div uk-form-custom="target: true">
            <input type="file" @change="handleFileUpload()" ref="file">
            <input class="uk-input uk-form-width-medium"   type="text" placeholder="Seleccionar archivo" disabled>
        </div>
    </div>
  </form>

          <p class="uk-text-right">
              <button class="uk-button theme-simple uk-button-default uk-modal-close" type="button">Cancelar</button>
              <button class="uk-button uk-button theme-a" type="submit" @click="addHeader">Guardar</button>
          </p>
      </div>
  </div>
    <!-- end Modal Add -->

  </div>
</div>

</template>

<script>
let UIkit;

if (process.browser) {
  UIkit = require('uikit');
}
import axios from 'axios'
  export default{
    layout: 'panel',
    data(){
      return {
        baseUrl: "",
        headers: [],
        title: "",
        linkto: "",
        subtitle: "",
        file: null,
        content: ""
      }
    },
    beforeMount() {
      this.baseUrl = this.$axios.defaults.baseURL
    },
    mounted() {
      this.loadHeaders()
    },
    methods: {
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
      loadHeaders: function() {
        axios
          .get(this.baseUrl + '/headers', {
            params: {
              _sort: 'id:asc' // Generates http://localhost:1337/posts?_sort=createdAt:desc
            }
          })
          .then(response => {
            // Handle success.
            //console.log('Well done, here is the list of posts: ', response.data);
            this.headers = response.data
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error);
          });
      },
      addHeader: function(){

        axios
          .post(this.baseUrl + '/headers/',{
            title: this.title,
            subtitle: this.subtitle,
            linkto: this.linkto,
            description: this.content
          })
          .then(response => {
            // Handle success.
            //console.log('Well done, here is the list of posts: ', response.data);
            var newHeader = response.data

            this.uploadFile(newHeader)
            //this.glossary.unshift(newTerm)
            this.title = ""
            this.subtitle = ""
            this.linkto = ""
            this.description = ""
           UIkit.modal(this.$refs.headermodal).hide()
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error);
          });
      },
      uploadFile(newHeader){


                 let headerData = new FormData()
                 headerData.append('files', this.file)
                 headerData.append('refId', newHeader.id)
                 headerData.append('ref', 'header')
                 headerData.append('field', 'cover')

                 axios
                   .post(this.baseUrl + '/upload',
                    headerData,
                    {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                  })
                   .then(response => {
                     this.$router.go()
                   })
                   .catch(error => {
                     // Handle error.
                     console.log('An error occurred:', error);
                   });
      },
      deleteHeader: function(id, header){
        axios
          .delete(this.baseUrl + '/headers/' + id)
          .then(response => {
            // Handle success.
            //console.log('Well done, here is the list of posts: ', response.data);

             this.headers.splice(this.headers.indexOf(header), 1);
            console.log(word)
            //this.glossary.remove(word)
            this.name = ""
            this.linkto = ""
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error);
          });
      },
    }
  }

</script>
