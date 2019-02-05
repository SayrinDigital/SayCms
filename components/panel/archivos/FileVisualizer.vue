<template>
<div>


  <div>
    <Fileuploader v-on:event_child="eventChild"></Fileuploader>
  </div>

<div class="uk-container uk-container-large">


    <div class="uk-section uk-section-small">
      <div class="uk-container uk-container-large">

        <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
          <div class="uk-navbar-left">
            <div class="uk-navbar-item">
                    <h3 class="uk-margin-remove">Tienes {{ totalItems }} archivos</h3>
            </div>
          </div>
          <div class="uk-navbar-right">
            <div class="uk-navbar-item">
              <button class="uk-button theme-a" v-on:click="addnewItem"><span uk-icon="icon: folder" class="uk-margin-small-right"></span> Crear Carpeta</button>
            </div>
            <div class="uk-navbar-item">
              <button class="uk-button theme-a" uk-toggle="target: #modal-fileuploader"><span uk-icon="icon: upload" class="uk-margin-small-right"></span> Subir</button>
            </div>
          </div>
        </nav>

        <div class="uk-section uk-section-small">
          <div  >
            <transition-group mode="out-in" name="fade" tag="div" class="uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1" uk-grid="masonry: true">
            <Filecard v-for="(item, index) in files" v-bind:file="item" v-bind:key="item.id"></Filecard>
          </transition-group>
          </div>

          <!-- Modal -->

          <div v-if="showModal" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-background-cover" uk-img v-bind:style="{ 'background-image': 'url(' + 'http://localhost:8000/media/' + file.contentUrl + ')' }">
                <h2 class="uk-modal-title">{{ file.name }}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p class="uk-text-right">
                    <button class="uk-button uk-button-default uk-modal-close"  type="button">Cancel</button>
                    <button class="uk-button uk-button-primary" type="button">Save</button>
                </p>
            </div>
        </div>

        </div>



        <div>
            <ul class="uk-pagination">
              <li v-if="currentPage > 1"><a @click="prevPage"><span class="uk-margin-small-right" uk-pagination-previous></span> Anterior</a></li>
              <li v-if="currentPage < totalPages" class="uk-margin-auto-left"><a @click="nextPage">Siguiente <span class="uk-margin-small-left" uk-pagination-next></span></a></li>
            </ul>
        </div>

      </div>
    </div>
</div>

</div>
</template>

<script>
import axios from 'axios';
import Filecard from '~/components/panel/archivos/Filecard'
import Fileuploader from '~/components/panel/archivos/Fileuploader'
import UIkit from 'uikit'

export default {
  name: 'dashboard',
  components: {
     Filecard,
     Fileuploader
  },
  data() {
    return {
      files: null,
      totalItems: 0,
      totalPages: 0,
      size: 15,
      pageNumber: 1,
      currentPage: 1,
      baseUrl: 'http://localhost:8000/media_objects/',
      showModal: false,
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    eventChild: function(item) {
			this.files.unshift(item)
		},
    getPosts(){

      UIkit.notification({message: '<span class="uk-margin-small-right" uk-icon=\'icon: future\'></span> Cargando...'})

      axios
        .get(this.baseUrl +  "?itemsPerPage=" + this.size + "&page=" + this.currentPage )
        .then(response =>
          (this.files = response.data._embedded.item,
            this.totalItems = response.data.totalItems,
            this.totalPages = this.totalItems/this.size,
            UIkit.notification.closeAll()
          )
        )
    },
    nextPage() {
      this.currentPage++
      this.getPosts()
    },
    prevPage() {
      this.currentPage--
      this.getPosts()
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    addnewItem(item) {

    var newItem = {
      name : "Hola",
      size : 2000000,
      type : "image/jpeg",
      id: 100
    }

      this.files.push(newItem)
    },
  },
}
</script>
