<template>
<div class="uk-section uk-section-small">

  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Glosario</h3>
            <p>Administre los términos que serán mostrados en el glosario.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a"  type="button" uk-toggle="target: #word-modal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Palabra</button>
        </div>
      </div>
    </nav>

    <hr class="uk-hr">

    <div class="uk-section uk-section-small">
      <h4>Listado de Palabras</h4>

      <div class="uk-section uk-section small">

        <transition-group name="fade" tag="div" class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
          <div v-for="word in glossary" :key="word.id">
            <div class="glossary-card  uk-box-shadow-hover-large uk-inline-clip uk-transition-toggle" tabindex="0">
              <div>
                <h4>{{ word.term }}</h4>
                <p>{{ word.description }}</p>
              </div>
              <div class="say uk-transition-slide-bottom uk-position-bottom uk-overlay">
                <div class="uk-align-right">
                  <ul class="uk-iconnav">
                    <li><a @click="editWord(word)" href="#" uk-icon="icon: file-edit"></a></li>
                    <li><a @click="deleteWord(word.id, word)" href="#" uk-icon="icon: trash"></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </transition-group>

      </div>

    </div>

  </div>

  <div ref="wordmodal" id="word-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Agregar Palabra</h2>
        <p>Agrega una nueva palabra a tu glosario.</p>

        <form class="uk-form-stacked uk-margin">
    <div>
        <label class="uk-form-label"></label>
        <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="word"  type="text" placeholder="Término">
        </div>
    </div>
    <div>
        <div class="uk-form-label"></div>
        <div class="uk-form-controls">
          <textarea class="uk-textarea uk-form-large" v-model="description" rows="3" placeholder="Significado"></textarea>
        </div>
    </div>
</form>

        <p class="uk-text-right">
            <button class="uk-button theme-simple uk-button-default uk-modal-close" type="button">Cancelar</button>
                <button class="uk-button uk-button theme-a" type="submit" @click="addWord">Guardar</button>
        </p>
    </div>
</div>

<!-- edit modal -->

<div ref="editwordmodal" id="word-modal" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Editar Palabra</h2>
      <p>Edita la siguiente palabra.</p>

      <form class="uk-form-stacked uk-margin">
  <div>
      <label class="uk-form-label"></label>
      <div class="uk-form-controls">
          <input class="uk-input uk-form-large" v-model="editedword"  type="text" placeholder="Término">
      </div>
  </div>
  <div>
      <div class="uk-form-label"></div>
      <div class="uk-form-controls">
        <textarea class="uk-textarea uk-form-large" v-model="editeddescription" rows="3" placeholder="Significado"></textarea>
      </div>
  </div>
</form>

      <p class="uk-text-right">
          <button class="uk-button theme-simple uk-button-default uk-modal-close" type="button">Cancelar</button>
              <button class="uk-button uk-button theme-a" type="submit" @click="saveEditedWord">Guardar</button>
      </p>
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
      baseUrl: "",
      glossary: [],
      editedword: "",
      editeddescription: "",
      word: "",
      description: "",
      isediting: false,
      currentId: null
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.loadGlossary()
  },
  methods: {
    editWord: function(word){

            this.editedword = word.term
            this.editeddescription = word.description
            this.currentId = word.id
      UIkit.modal(this.$refs.editwordmodal).show()
    },
    saveEditedWord: function(){

            axios
              .put(this.baseUrl + '/glossaries/' + this.currentId,{
                term: this.editedword,
                description: this.editeddescription
              })
              .then(response => {
                // Handle success.
                //console.log('Well done, here is the list of posts: ', response.data);
                var newTerm = response.data
                //this.glossary.unshift(newTerm)
                this.word = ""
                this.description = ""
                           UIkit.modal(this.$refs.editwordmodal).hide()
                           this.$router.go()
                           //window.location.reload(true)
              })
              .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
              });
    },
    addWord: function(){
       axios
         .post(this.baseUrl + '/glossaries/',{
           term: this.word,
           description: this.description
         })
         .then(response => {
           // Handle success.
           //console.log('Well done, here is the list of posts: ', response.data);
           var newTerm = response.data
           this.glossary.unshift(newTerm)
           this.word = ""
           this.description = ""
                      UIkit.modal(this.$refs.wordmodal).hide()
         })
         .catch(error => {
           // Handle error.
           console.log('An error occurred:', error);
         });
    },
    deleteWord: function(id, word){
      axios
        .delete(this.baseUrl + '/glossaries/' + id)
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          var newTerm = response.data
           this.glossary.splice(this.glossary.indexOf(word), 1);
          console.log(word)
          //this.glossary.remove(word)
          this.word = ""
          this.description = ""
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadGlossary: function() {
      axios
        .get(this.baseUrl + '/glossaries', {
          params: {
            _sort: 'id:desc' // Generates http://localhost:1337/posts?_sort=createdAt:desc
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.glossary = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }
  }

}
</script>

<style lang="scss">
.glossary-card {
    background-color: #fff;
    border-radius: 6px;
    padding: 20px;
}
</style>
