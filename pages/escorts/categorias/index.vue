<template>
<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Categorías</h3>
            <p>Administre las categorías principales de las escorts.</p>
            <p v-if="categories">Tiene un total de {{ categories.length }} categorías.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #add-category-modal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Categoría</button>
        </div>
      </div>
    </nav>


      <hr class="uk-hr">

      <div class="uk-section uk-section-small">
        <h4>Listado</h4>

        <div class="uk-section uk-section small">

          <transition-group name="fade" tag="div" class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
            <div v-for="category in categories" :key="category.id">
              <div class="glossary-card  uk-box-shadow-hover-large uk-inline-clip uk-transition-toggle" tabindex="0">
                <div>
                  <img class="uk-margin" v-if="category.cover" :src="baseUrl + category.cover.url" alt="">
                  <h4>{{ category.name }}</h4>
                  <p v-if="category.escorts">{{ category.escorts.length }} escorts</p>
                </div>
                <div class="say uk-transition-slide-bottom uk-position-bottom uk-overlay">
                  <div class="uk-align-right">
                    <ul class="uk-iconnav">
                      <li><a @click="editCategory(category)" href="#" uk-icon="icon: file-edit"></a></li>
                      <li v-if="category.name != 'Premium'"><a @click="deleteCategory(category.id, category)" href="#" uk-icon="icon: trash"></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>

        </div>

      </div>

  </div>


  <!-- Category -->

  <div ref="addcategorymodal" id="add-category-modal"  uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Agregar Categoría</h2>
      <p>Agrega una nueva categoría.</p>

      <form class="uk-form-stacked uk-margin" @submit.stop.prevent="addCategory()">
        <div>
          <label class="uk-form-label"></label>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="categoryname" type="text" placeholder="Nombre">
          </div>
          <div class="uk-margin" uk-margin>
            <div uk-form-custom="target: true">
                <input type="file" @change="uploadCover">
                <input class="uk-input uk-form-width-medium" type="text" placeholder="Subir Cover" disabled>
            </div>
          </div>
        </div>
        <div v-if="isuploading" class="uk-margin">
          <div uk-spinner></div>
        </div>
        <div class="uk-margin">

                <p class="uk-text-right">
                  <button class="uk-button theme-simple uk-button-default uk-modal-close" type="button">Cancelar</button>
                  <button class="uk-button uk-button theme-a"  type="submit">Guardar</button>
                </p>
        </div>
      </form>
    </div>
  </div>

  <div ref="editcategorymodal" id="edit-category-modal" @submit.stop.prevent="saveEditedCategory()" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Editar Categoría</h2>
      <p>Edita una categoría.</p>

      <form class="uk-form-stacked uk-margin">
        <div>
          <label class="uk-form-label"></label>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="editedcategoryname" type="text" placeholder="Nombre">
          </div>
        </div>
        <div v-if="isuploading" class="uk-margin">
          <div uk-spinner></div>
        </div>
        <div class="uk-margin">
          <p class="uk-text-right">
            <button class="uk-button theme-simple uk-button-default uk-modal-close" type="button">Cancelar</button>
            <button class="uk-button uk-button theme-a" type="submit">Guardar</button>
          </p>
        </div>
      </form>



    </div>
  </div>

</div>



</template>

<script>

let UIkit;

if (process.browser) {
  UIkit = require('uikit');
}
import axios from 'axios'
export default {
  layout: 'panel',
  data() {
    return {
      categories: [],
      baseUrl: "",
      isuploading: false,
      categoryname: "",
      editedcategoryname: "",
      currentId: null,
      token: null,
      image: ""
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
      this.token = this.$auth.getToken(this.$auth.strategy.name)
  },
  mounted() {
    this.loadCategories()
  },
  methods: {

    uploadCover(e){
       this.image = e.target.files[0]
    },

    editCategory: function(category){
            this.editedcategoryname = category.name
            this.currentId = category.id
            UIkit.modal(this.$refs.editcategorymodal).show()
    },
    saveEditedCategory: function(){

      this.isuploading = true
            axios
              .put(this.baseUrl + '/categories/' + this.currentId,{
                name: this.editedcategoryname,
              })
              .then(response => {
                // Handle success.
                //console.log('Well done, here is the list of posts: ', response.data);
                var newTerm = response.data

                this.name = ""
                this.isuploading = false
                           UIkit.modal(this.$refs.editcategorymodal).hide()
                           this.$router.go()
                           //window.location.reload(true)
              })
              .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
              });
    },
    deleteCategory(id, category){
      axios
        .delete(this.baseUrl + '/categories/' + id)
        .then(response => {

          this.glossary.splice(this.glossary.indexOf(category), 1);

          this.categoryname = ""
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    addCategory() {

      this.isuploading = true

      axios
        .post(this.baseUrl + '/categories', {
            name: this.categoryname
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          if (this.categories.length > 0) {
            this.categories.unshift(response.data)
          } else {
            this.categories.push(response.data)
          }

          this.isuploading = false
          this.categoryname = ""

          let headerData = new FormData()
          headerData.append('files', this.image)
          headerData.append('refId', response.data.id)
          headerData.append('ref', 'category')
          headerData.append('field', 'cover')

          axios
            .post(this.baseUrl + '/upload',
              headerData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: this.token
                }
              })
            .then(response => {
              console.log(response.data)
               UIkit.modal(this.$refs.addcategorymodal).hide()
            })
            .catch(error => {
              // Handle error.
              console.log('An error occurred:', error);
            });

        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
          this.isuploading = false
        });
    },
    loadCategories() {
      axios
        .get(this.baseUrl + '/categories', {
          headers: {
            Authorization: this.token
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.categories = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }
  }
}
</script>
