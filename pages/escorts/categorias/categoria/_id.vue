<template>
<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove"><span v-if="category">{{ category.name }}</span> | Categorías</h3>
            <p>Administre las escorts por categoría.</p>
          </div>
        </div>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <button class="uk-button theme-a" type="button" uk-toggle="target: #loadGirlsmodal"><span uk-icon="icon: pencil" class="uk-margin-small-right"></span> Agregar Escorts</button>
        </div>
      </div>
    </nav>

    <hr class="uk-hr">

    <div class="uk-section uk-section-small">
      <h4>Listado de Escorts</h4>

      <div class="uk-section uk-section small">

        <div class="uk-child-width-1-5@m uk-grid-match uk-grid-small" uk-grid>
          <div v-for="girl in girls" :key="girl.id">
            <GirlCard :girl="girl"></GirlCard>
          </div>
        </div>

      </div>

    </div>

    <div ref="loadGirlsmodal" id="loadGirlsmodal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">Categorizar Escort</h2>
        <p>Selecciona las escorts a ser agregadas a esta categoría.</p>
        <div class="uk-margin">

            <ul class="uk-margin uk-list-divider uk-list" v-if="aregirlshown">
            <li  v-for="(girl, index) in girlslistpicker" :key="girl.id">
              <div class="uk-child-width-1-2 uk-list-divider uk-flex uk-flex-middle" uk-grid>
                <div>
                  <div>
                    <h4>{{ girl.name }}</h4>
                    <p v-if="girl.category">{{ girl.category.name }}</p>
                    <p v-else>No Categorizada</p>
                </div>
              </div>
                <div>
                  <div class="uk-text-right">
                    <button class="uk-button theme-a" @click="addToCurrentCategory(girl.id)" type="submit"><span uk-icon="icon: plus" class="uk-icon uk-margin-small-right"></span> Agregar </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
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
import GirlCard from '~/components/GirlCard.vue'
export default {

  layout: 'panel',
  components: {
    GirlCard
  },
  data() {
    return {
      id: null,
      category: null,
      girls: [],
      isloading: true,
      baseUrl: '',
      girlslistpicker: [],
      aregirlshown: false,
      selectedGirls: [],
      select: [],
      token: "",
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
    this.id = this.$route.params.id
  },
  mounted() {
    this.loadCategoryEscorts()
    this.loadEscorts()

   var vim = this

    UIkit.util.on(this.$refs.loadGirlsmodal, 'beforeshow', function(e) {
      vim.aregirlshown = true
    });
    UIkit.util.on(this.$refs.loadGirlsmodal, 'hidden', function(e) {
      vim.aregirlshown = false
    });
  },
  methods: {
    loadEscorts() {
      axios
        .get(this.baseUrl + '/escorts/',{
          params: {
            _sort: 'name'
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.girlslistpicker = response.data

        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    addToCurrentCategory(girlid){

    console.log('escort: ' + girlid)

      axios
        .put(this.baseUrl + '/escorts/' + girlid, {
          category: this.id,
          headers: {
            Authorization: this.token
          }
        })
        .then(response => {

          UIkit.modal.alert('¡Se cambió la categoría de la escort!').then(function () {

          });

          console.log(response.data)

        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    loadCategoryEscorts() {

      axios
        .get(this.baseUrl + '/categories/' + this.id, {
          headers: {
            Authorization: this.token
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.category = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });

      axios
        .get(this.baseUrl + '/escorts/', {
          params: {
            'category': this.id
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          this.girls = response.data
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    }
  }

}
</script>
