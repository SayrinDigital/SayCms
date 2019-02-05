<template>
<div class="uk-section uk-section-small">
  <div class="uk-container">

    <div class="uk-child-width-1-2@s uk-flex uk-flex-middle" uk-grid>
      <div>
        <h3>Editar Entrada</h3>
        <p>Usa el editor para escribir tu entrada en el blog y guárdala cuando estés listo!</p>
      </div>


      <div class="">
        <div class="uk-text-right">
          <button class="uk-button theme-a"><span uk-icon="icon: cloud-upload" class="uk-margin-small-right"></span> Guardar</button>
        </div>
      </div>
    </div>

    <hr class="uk-hr uk-margin-medium">


    <div>



      <div>
        <h3>Encabezado</h3>
        <p>Cambie la información relevante como el título y un resumen de su entrada.</p>
        <div class="uk-section uk-section-small">

          <div v-if="finishedFetchingData">

            <div>
              <label class="uk-form-label" for="form-stacked-text">Título</label>
            <div class="uk-form-controls">
                <input class="uk-input uk-form-blank uk-width-1-1 blank-title-input uk-text-capitalize" type="text" :value="post.title" placeholder="Mi Entrada">
            </div>
          </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">Descripción</label>
            <div class="uk-form-controls">
                <textarea class="uk-textarea uk-form-blank uk-width-1-1" rows="4" type="text" placeholder="Descripción De Mi Entrada">{{ post.body }}</textarea>
            </div>
          </div>
          </div>

        </div>
      </div>


      <div class="uk-child-width-1-2@s uk-flex uk-flex-middle" uk-grid>
        <div class="">
          <div>
            <h3>Cover</h3>
            <p>Usa una imagen que represente la identidad o idea de tu entrada.</p>
          </div>
        </div>
        <div>
          <div class="uk-text-right">
            <a class="uk-button theme-a" href="#modal-center-filevisualizer" uk-toggle><span uk-icon="icon: album" class="uk-margin-small-right"></span> Elegir</a>
          </div>
        </div>
      </div>


      <div class="uk-section uk-section-small">
        <div class="uk-border-rounded padding-image-grow uk-box-shadow-medium" data-src="https://images.unsplash.com/photo-1518555145405-092b7a9dfc71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1305&q=80" uk-img>
        </div>
      </div>
    </div>

    <div>
      <div>
        <h3>Contenido</h3>
        <p>Exprese toda la información que desee contar a sus lectores.</p>
      </div>
      <div class="uk-section uk-section-small">
        <EntryEditor :content="post.html"></EntryEditor>
      </div>
    </div>

    <div>
      <div>
        <h3>Configuración</h3>
        <p>Opciones indispensables para la mejor administración de su blog.</p>
      </div>
      <div class="uk-section uk-section-small">
        <form class="uk-grid-small" uk-grid>
          <div class="uk-width-1-2@s">
            <div>
              <label class="uk-form-label" for="form-stacked-text">Etiquetas</label>
              <div class="uk-form-controls">
                <div class="uk-inline uk-width-1-1">
                  <a class="uk-form-icon" href="#" uk-icon="icon: pencil"></a>
                  <input class="uk-input" placeholder="Palabras separadas por espacios" type="text">
                </div>
              </div>
            </div>
          </div>

          <div class="uk-width-1-2@s">
            <div>
              <label class="uk-form-label" for="form-horizontal-select">Categoría</label>
              <div class="uk-form-controls">
                <div class="uk-form-custom uk-width-1-1" uk-form-custom="target: > * > span:first-child">
              <select>
                  <option value="">Elige la categoría</option>
                  <option value="1">Option 01</option>
                  <option value="2">Option 02</option>
                  <option value="3">Option 03</option>
                  <option value="4">Option 04</option>
              </select>
              <button class="uk-button uk-button-default uk-width-1-1" type="button" tabindex="-1">
                  <span></span>
                  <span uk-icon="icon: chevron-down"></span>
              </button>
          </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>

    <!-- FileVisualizer -->

    <div id="modal-center-filevisualizer" class="uk-flex-top uk-modal-container" uk-modal>
      <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

          <button class="uk-modal-close-default" type="button" uk-close></button>

          <FileVisualizer></FileVisualizer>

      </div>
  </div>

  <!-- End FileVisualizer -->

  </div>
</div>
</template>

<script>
import axios from 'axios'
import EntryEditor from '~/components/panel/blog/EntryEditor'
import FileVisualizer from '~/components/panel/archivos/FileVisualizer'

export default {
    transition: 'slide-left',
    'layout' : 'panel',
  components: {
    EntryEditor,
    FileVisualizer
  },
  data() {
    return{
      baseUrl: 'https://demo.ghost.io/ghost/api/v2/content/posts/',
      apiKey: '?key=22444f78447824223cefc48062',
      id : this.$route.params.id,
      postcontent: null,
      post: [],
      finishedFetchingData: false
    }
  },

  created () {
    this.loadPost(this.id)
  },
  beforeRouteUpdate (to, from, next) {
    this.loadPost(to.params.id)
    next();
  },
  methods: {
    loadPost: function(postid) {
      var self = this;
      axios
        .get(this.baseUrl + '/' + postid + '/' + this.apiKey)
        .then(response =>
          (
            self.post = response.data.posts[0],
            self.finishedFetchingData = true
          )
        )
    },
  }
}
</script>
