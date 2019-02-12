<template>
<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Características</h3>
            <p>Administre las características principales de las escorts. Importante para filtrarlas.</p>
            <p v-if="characteristics">Tiene un total de {{ characteristics.length }} características.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #add-characteristic-modal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Característica</button>
        </div>
      </div>
    </nav>


      <hr class="uk-hr">

      <div class="uk-section uk-section-small">
        <h4>Listado</h4>

        <div class="uk-section uk-section small">

          <transition-group name="fade" tag="div" class="uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid uk-scrollspy="cls: uk-animation-slide-bottom-medium; target: > div > div; delay: 200; repeat: true">
            <div v-for="characteristic in characteristics" :key="characteristic.id">
              <div class="glossary-card  uk-box-shadow-hover-large uk-inline-clip uk-transition-toggle" tabindex="0">
                <div>
                  <h4>{{ characteristic.name }}</h4>
                </div>
                <div class="say uk-transition-slide-bottom uk-position-bottom uk-overlay">
                  <div class="uk-align-right">
                    <ul class="uk-iconnav">
                      <li><a @click="editCharacteristic(characteristic)" href="#" uk-icon="icon: file-edit"></a></li>
                      <li v-if="characteristic.name != 'Premium'"><a @click="deleteCharacteristic(characteristic.id, characteristic)" href="#" uk-icon="icon: trash"></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>

        </div>

      </div>

  </div>


  <!-- characteristic -->

  <div ref="addcharacteristicmodal" id="add-characteristic-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Agregar Características</h2>
      <p>Agrega una nueva característica.</p>

      <form class="uk-form-stacked uk-margin" @submit.stop.prevent="addCharacteristic()">
        <div>
          <label class="uk-form-label"></label>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="characteristicname" type="text" placeholder="Nombre">
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

  <div ref="editcharacteristicmodal" id="edit-characteristic-modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Agregar Característica</h2>
      <p>Edita una característica</p>

      <form class="uk-form-stacked uk-margin" @submit.stop.prevent="saveEditedCharacteristic()">
        <div>
          <label class="uk-form-label"></label>
          <div class="uk-form-controls">
            <input class="uk-input uk-form-large" v-model="editedcharacteristicname" type="text" placeholder="Nombre">
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
      characteristics: [],
      baseUrl: "",
      isuploading: false,
      characteristicname: "",
      editedcharacteristicname: "",
      currentId: null,
      token: ""
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
    this.token =   this.$auth.getToken(this.$auth.strategy.name)
  },
  mounted() {
    this.loadCharacteristics()
  },
  methods: {
    editCharacteristic: function(characteristic){
            this.editedcharacteristicname = characteristic.name
            this.currentId = characteristic.id
            UIkit.modal(this.$refs.editcharacteristicmodal).show()
    },
    saveEditedCharacteristic: function(){

      this.isuploading = true
            axios
              .put(this.baseUrl + '/characteristics/' + this.currentId,{
                name: this.editedcharacteristicname,
              })
              .then(response => {
                // Handle success.
                //console.log('Well done, here is the list of posts: ', response.data);
                var newTerm = response.data
                this.name = ""
                this.isuploading = false
                           UIkit.modal(this.$refs.editcharacteristicmodal).hide()
                           this.$router.go()
                           //window.location.reload(true)
              })
              .catch(error => {
                // Handle error.
                console.log('An error occurred:', error);
              });
    },
    deleteCharacteristic(id, characteristic){
      axios
        .delete(this.baseUrl + '/characteristics/' + id)
        .then(response => {

          if(this.characteristics.length>1){
          this.characteristics.splice(this.characteristics.indexOf(characteristic), 1);
        }else{
          this.characteristics= []
        }

          this.characteristicname = ""
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    addCharacteristic() {

      this.isuploading = true

      axios
        .post(this.baseUrl + '/characteristics', {
            name: this.characteristicname
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          if (this.characteristics.length > 0) {
            this.characteristics.unshift(response.data)
          } else {
            this.characteristics.push(response.data)
          }

          this.isuploading = false
          UIkit.modal(this.$refs.addcharacteristicmodal).hide()
          this.characteristicname = ""
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
          this.isuploading = false
        });
    },
    loadCharacteristics() {
      axios
        .get(this.baseUrl + '/characteristics', {
          headers: {
            Authorization: this.token
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.characteristics = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }
  }
}
</script>
