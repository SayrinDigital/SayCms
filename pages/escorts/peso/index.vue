<template>
<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Peso</h3>
            <p>Administre los filtros de peso.</p>
            <p v-if="weights">Tiene un total de {{ weights.length }} filtros de peso.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #add-weight-modal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Filtro de Peso</button>
        </div>
      </div>
    </nav>


      <hr class="uk-hr">

      <div class="uk-section uk-section-small">
        <h4>Listado</h4>

        <div class="uk-section uk-section small">

          <transition-group name="fade" tag="div" class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
            <div v-for="weight in weights" :key="weight.id">
              <div class="glossary-card  uk-box-shadow-hover-large uk-inline-clip uk-transition-toggle" tabindex="0">
                <div>
                  <h4>{{ weight.name }}</h4>
                </div>
                <div class="say uk-transition-slide-bottom uk-position-bottom uk-overlay">
                  <div class="uk-align-right">
                    <ul class="uk-iconnav">
                      <li><a @click="editweight(weight)" href="#" uk-icon="icon: file-edit"></a></li>
                      <li v-if="weight.name != 'Premium'"><a @click="deleteweight(weight.id, weight)" href="#" uk-icon="icon: trash"></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>

        </div>

      </div>

  </div>


  <!-- weight -->

  <div ref="addweightmodal" id="add-weight-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Agregar Filtro de Peso</h2>
      <p>Agrega un nuevo filtro.</p>

      <form class="uk-form-stacked uk-margin" @submit.stop.prevent="addweight()">
        <div>
          <label class="uk-form-label"></label>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="weightname" type="text" placeholder="Nombre">
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

  <div ref="editweightmodal" id="edit-weight-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Agregar Filtro de Peso</h2>
      <p>Edita un filtro</p>

      <form class="uk-form-stacked uk-margin" @submit.stop.prevent="saveEditedweight()">
        <div>
          <label class="uk-form-label"></label>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="editedweightname" type="text" placeholder="Nombre">
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
      weights: [],
      baseUrl: "",
      isuploading: false,
      weightname: "",
      editedweightname: "",
      currentId: null
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.loadweights()
  },
  methods: {
    editweight: function(weight){
            this.editedweightname = weight.name
            this.currentId = weight.id
            UIkit.modal(this.$refs.editweightmodal).show()
    },
    saveEditedweight: function(){

      this.isuploading = true
            axios
              .put(this.baseUrl + '/weightescorts/' + this.currentId,{
                name: this.editedweightname,
              })
              .then(response => {
                // Handle success.
                //console.log('Well done, here is the list of posts: ', response.data);
                var newTerm = response.data

                this.name = ""
                this.isuploading = false
                           UIkit.modal(this.$refs.editweightmodal).hide()
                           this.$router.go()
                           //window.location.reload(true)
              })
              .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
              });
    },
    deleteweight(id, weight){
      axios
        .delete(this.baseUrl + '/weightescorts/' + id)
        .then(response => {

          if(this.weights.length>1){
          this.weights.splice(this.glossary.indexOf(weight), 1);
        }else{
          this.weights= []
        }

          this.weightname = ""
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    addweight() {

      this.isuploading = true

      axios
        .post(this.baseUrl + '/weightescorts', {
            name: this.weightname
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          if (this.weights.length > 0) {
            this.weights.unshift(response.data)
          } else {
            this.weights.push(response.data)
          }

          this.isuploading = false
          UIkit.modal(this.$refs.addweightmodal).hide()
          this.weightname = ""
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
          this.isuploading = false
        });
    },
    loadweights() {
      axios
        .get(this.baseUrl + '/weightescorts', {
          params: {
            _sort: 'name:desc' // Generates http://localhost:1337/posts?_sort=createdAt:desc
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.weights = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }
  }
}
</script>
