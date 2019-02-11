<template>
<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Categorías</h3>
            <p>Administre las categorías principales de las escorts.</p>
            <p v-if="categories">Tiene un total de categorías.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #add-category-modal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Categoría</button>
        </div>
      </div>
    </nav>
  </div>

  <hr class="uk-hr">

  <div class="uk-section uk-section-small">
    <h4>Listado de Palabras</h4>

    <div class="uk-section uk-section small">

      <transition-group name="fade" tag="div" class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
        <div v-for="category in categories" :key="category.id">
          <div class="glossary-card  uk-box-shadow-hover-large uk-inline-clip uk-transition-toggle" tabindex="0">
            <div>
              <h4>{{ category.name }}</h4>
              <p v-if="category.escorts"></p>
            </div>
            <div class="say uk-transition-slide-bottom uk-position-bottom uk-overlay">
              <div class="uk-align-right">
                <ul class="uk-iconnav">
                  <!--<li><a @click="editWord(word)" href="#" uk-icon="icon: file-edit"></a></li>-->
                  <!--<li><a @click="deleteWord(word.id, word)" href="#" uk-icon="icon: trash"></a></li>-->
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

<div ref="addcategorymodal" id="add-category-modal" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <h2 class="uk-modal-title">Agregar Categoría</h2>
    <p>Agrega una nueva categoría.</p>

    <form class="uk-form-stacked uk-margin">
      <div>
        <label class="uk-form-label"></label>
        <div class="uk-form-controls">
          <input class="uk-input uk-form-large" v-model="categoryname" type="text" placeholder="Nombre">
        </div>
      </div>
      <div v-if="isuploading" class="uk-margin">
        <div uk-spinner></div>
      </div>
    </form>


    <p class="uk-text-right">
      <button class="uk-button theme-simple uk-button-default uk-modal-close" type="button">Cancelar</button>
      <button class="uk-button uk-button theme-a" type="submit">Guardar</button>
    </p>
  </div>
</div>

</div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'panel',
  data() {
    return {
      categories: [],
      baseUrl: "",
      isuploading: false,
      categoryname: ""
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.loadCategories()
  },
  methods: {
    addCategory() {

      this.isuploading = true

      axios
        .post(this.baseUrl + '/categories', {
          params: {
            name: this.categoryname
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          /*if (this.categories.length > 0) {
            this.categories.unshift(response.data)
          } else {
            this.categories.push(response.data)
          }*/

          this.isuploading = false
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
          params: {
            _sort: 'name:desc' // Generates http://localhost:1337/posts?_sort=createdAt:desc
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
