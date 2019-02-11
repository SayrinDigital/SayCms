<template>

<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Grupos de Anuncios</h3>
            <p>Administre sus anuncios.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #ad-modal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Anuncio</button>
        </div>
      </div>
    </nav>

    <hr class="uk-hr">

    <div class="uk-section uk-section-small">
      <h4>Listado de Grupos de Anuncios</h4>

      <div class="uk-section uk-section small">

        <transition-group name="fade" tag="div" class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
          <div v-for="ad in adgroup" :key="ad.id">

            <div class="uk-border-rounded uk-overflow-hidden uk-position-relative uk-box-shadow-hover-large ">
              <div v-if="ad.cover" :data-src="baseUrl + ad.cover.url" uk-img class="uk-background-cover card-container uk-inline-clip uk-transition-toggle" tabindex="0">
                <div class="say uk-transition-slide-bottom uk-position-bottom uk-overlay">
                  <div class="uk-align-right">
                    <ul class="uk-iconnav">
                      <!--<li><a @click="editAd(ad)" href="#" uk-icon="icon: file-edit"></a></li>-->
                      <li><a @click="deleteAd(ad.id, ad)" href="#" uk-icon="icon: trash"></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="footer uk-background-default uk-card-body">
                <div>
                  <h4>{{ ad.name }}</h4>
                  <p>{{ ad.linkto }}</p>
                </div>
              </div>
            </div>

          </div>
        </transition-group>

      </div>

    </div>

    <!-- Modal Ad Add-->
    <div ref="admodal" id="ad-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
          <h2 class="uk-modal-title">Agregar Anuncio</h2>
          <p>Agrega un nuevo anuncio a este grupo.</p>

          <form class="uk-form-stacked uk-margin">
      <div>
          <label class="uk-form-label"></label>
          <div class="uk-form-controls">
              <input class="uk-input uk-form-large" v-model="name"  type="text" placeholder="Nombre">
          </div>
      </div>
      <div>
          <div class="uk-form-label"></div>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="linkto"  placeholder="Link de destino"/>
          </div>
      </div>
      <div class="uk-margin" uk-margin>
        <div uk-form-custom="target: true">
            <input type="file" @change="handleFileUpload()" ref="file">
            <input class="uk-input uk-form-width-medium"   type="text" placeholder="Seleccionar archivo" disabled>
        </div>
    </div>
    <div>
      <div uk-spinner v-if="isuploading"></div>
    </div>
  </form>

          <p class="uk-text-right">
              <button class="uk-button theme-simple uk-button-default uk-modal-close" type="button">Cancelar</button>
                  <button class="uk-button uk-button theme-a" type="submit" @click="addAd">Guardar</button>
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
    return{
       baseUrl : "",
           adgroup: null,
           id: null,
           name: "",
           linkto: "",
           file: "",
           isuploading: false
    }
  },
  beforeMount(){
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted(){
    this.id = this.$route.params.id
    this.loadAds()
 },
 methods: {
   loadAds: function(){

     axios
     .get(this.baseUrl + '/ads', {
       params:{
         "adgroup" :  this.id
       }
     })
       .then(response => {
         // Handle success.
         //console.log('Well done, here is the list of posts: ', response.data);
         if(response.data.length!=0){
         this.adgroup = response.data
       }
       })
       .catch(error => {
         // Handle error.
         console.log('An error occurred:', error);
       });
   },
   handleFileUpload(){
     this.file = this.$refs.file.files[0];
     console.log('somethind')
   },
   addAd: function(){

     this.isuploading = true

     axios
       .post(this.baseUrl + '/ads/',{
         name: this.name,
         linkto: this.linkto,
         adgroup: this.id
       })
       .then(response => {
         // Handle success.
         //console.log('Well done, here is the list of posts: ', response.data);
         var newAd = response.data

         this.uploadFile(newAd)
         //this.glossary.unshift(newTerm)
         this.word = ""
         this.description = ""
       })
       .catch(error => {
         // Handle error.
         console.log('An error occurred:', error);
       });
   },
   uploadFile(newAd){


              let adData = new FormData()
              adData.append('files', this.file)
              adData.append('refId', newAd.id)
              adData.append('ref', 'ad')
              adData.append('field', 'cover')

              axios
                .post(this.baseUrl + '/upload',
                 adData,
                 {
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 }
               })
                .then(response => {

               console.log(response.data)

                  var ad = {
                    "id": newAd.id,
                    "name": newAd.name,
                    "linkto": newAd.linkto,
                    "cover": response.data[0]
                  }

                 if(this.adgroup.length==0){
                    this.adgroup.push(ad)
                 }else{
                     this.adgroup.unshift(ad)
                 }

                    this.isuploading = false
                          UIkit.modal(this.$refs.admodal).hide()
                })
                .catch(error => {
                  // Handle error.
                  this.isuploading = false
                  console.log('An error occurred:', error);
                });
   },
   deleteAd: function(id, ad){
     axios
       .delete(this.baseUrl + '/ads/' + id)
       .then(response => {
         // Handle success.
         //console.log('Well done, here is the list of posts: ', response.data);
         var newTerm = response.data
          this.adgroup.splice(this.adgroup.indexOf(ad), 1);

       })
       .catch(error => {
         // Handle error.
         console.log('An error occurred:', error);
       });
   },
 }
}
</script>

<style>

.card-container{
  padding: 50%;
}

</style>
