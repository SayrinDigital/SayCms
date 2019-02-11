<template>
<div class="uk-section uk-section-small">
  <div class="uk-container uk-container-large">
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <div class="uk-navbar-item uk-padding-remove">
          <div>
            <h3 class="uk-margin-remove">Interfaz | Otras Configuraciones</h3>
            <p>Administre información de su sitio web.</p>
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
      <h4>Pie de Página</h4>

      <div class="uk-section uk-section small">

        <div class="uk-child-width-1-2@m" uk-grid="masonry: true">
          <div>

            <div class="uk-background-default uk-card-body uk-box-shadow-hover-large uk-border-rounded">
              <form class="uk-form-stacked uk-margin">
                <div class="uk-margin">
                  <h4>Contenedor</h4>
                  <p>Contenedor que se muestra antes del pie de página.</p>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label">Titulo</label>
                  <div class="uk-form-controls">
                    <input class="uk-input uk-form-large light" v-model="title" type="text" placeholder="Titulo">
                  </div>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label">Subtitulo</label>
                  <div class="uk-form-controls">
                    <input class="uk-input uk-form-large light" v-model="subtitle" type="text" placeholder="Subtitulo">
                  </div>
                </div>
                <div class="uk-margin">
                  <div class="uk-form-label">Título del Link</div>
                  <div class="uk-form-controls">
                    <textarea class="uk-textarea uk-form-large light" v-model="linktext" placeholder="..."></textarea>
                  </div>
                </div>
                <div class="uk-margin">
                  <div class="uk-form-label">Link de Destino</div>
                  <div class="uk-form-controls">
                    <input class="uk-input uk-form-large light" v-model="linkto" placeholder="https://" />
                  </div>
                </div>
                <div class="uk-margin">
                  <div class="uk-form-label">Contenido</div>
                  <div class="uk-form-controls">
                    <textarea class="uk-textarea uk-form-large light" v-model="content" placeholder="..."></textarea>
                  </div>
                </div>

              </form>

              <div v-if="iscontainsersaved">
                <p class="uk-text-success uk-text-center">Se guardaron los cambios</p>
              </div>

              <p class="uk-text-right">
                  <button class="uk-button uk-button theme-a" type="submit" @click="editContainer">Guardar</button>
              </p>

            </div>

          </div>
          <div>
            <div class="uk-background-default uk-card-body uk-box-shadow-hover-large uk-border-rounded">
              <form class="uk-form-stacked uk-margin">
                <div class="uk-margin">
                  <h4>Pie de Página</h4>
                  <p>Información mostrada en el pie de página</p>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label">Contenido</label>
                  <div class="uk-form-controls">
                    <textarea rows="4" class="uk-textarea uk-form-large light" v-model="footercontent" type="text" placeholder="..."></textarea>
                  </div>
                </div>
              </form>
              <div v-if="isfootersaved">
                <p class="uk-text-success uk-text-center">Se guardaron los cambios</p>
              </div>

              <p class="uk-text-right">
                  <button class="uk-button uk-button theme-a" type="submit" @click="saveFooterContainer">Guardar</button>
              </p>

            </div>

          </div>
          <div>
            <div class="uk-background-default uk-card-body uk-box-shadow-hover-large uk-border-rounded">
              <form class="uk-form-stacked uk-margin">
                <div class="uk-margin">
                  <h4>Mensaje Whatsapp</h4>
                  <p>Texto que envían los clientes al whatsapp.</p>
                </div>
                <div class="uk-margin">
                  <label class="uk-form-label">Contenido</label>
                  <div class="uk-form-controls">
                    <textarea rows="2" class="uk-textarea uk-form-large light" v-model="wspcontent" type="text" placeholder="..."></textarea>
                  </div>
                </div>
              </form>
              <div v-if="iswspsaved">
                <p class="uk-text-success uk-text-center">Se guardaron los cambios</p>
              </div>

              <p class="uk-text-right">
                  <button class="uk-button uk-button theme-a" type="submit" @click="saveWspContainer">Guardar</button>
              </p>

            </div>

          </div>
        </div>

      </div>

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
        title: "",
        subtitle: "",
        linkto: "",
        linktext: "",
        content: "",
        containerId: null,
        iscontainsersaved: false,
        isfootersaved: false,
        footercontent: "",
        wspcontent: "",
        iswspsaved: ""
    }
  },
  beforeMount() {
    this.baseUrl = this.$axios.defaults.baseURL
  },
  mounted() {
    this.getJoiunsContainer()
    this.getFooter()
    this.getWsp()
  },
  methods: {
    getJoiunsContainer: function(){
      axios
        .get(this.baseUrl + '/footers', {
          params: {
            _sort: 'id:asc',
            _limit: 1 // Generates http://localhost:1337/posts?_sort=createdAt:desc
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          var container = response.data[0]
          this.title = container.title
          this.subtitle = container.subtitle
          this.linkto = container.linkto
          this.content = container.content
          this.linktext = container.linktext
          this.containerId = container.id
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    getFooter: function(){
      axios
        .get(this.baseUrl + '/footers', {
          params: {
            _sort: 'id:asc',
            _limit: 1 // Generates http://localhost:1337/posts?_sort=createdAt:desc
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          var container = response.data[0]
          this.footercontent= container.content
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    getWsp: function(){
      axios
        .get(this.baseUrl + '/whatsapps', {
          params: {
            _sort: 'id:asc',
            _limit: 1 // Generates http://localhost:1337/posts?_sort=createdAt:desc
          }
        })
        .then(response => {
          // Handle success.
          //console.log('Well done, here is the list of posts: ', response.data);
          var container = response.data[0]
          this.wspcontent= container.message
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error);
        });
    },
    saveWspContainer(){
      this.iswspsaved = false
                   axios
                     .put(this.baseUrl + '/whatsapps/' + this.containerId,{
                       message: this.wspcontent
                     })
                     .then(response => {

                       var newTerm = response.data
                       this.iswspsaved = true

                     })
                     .catch(error => {
                       // Handle error.
                       console.log('An error occurred:', error);
                     });
    },
    saveFooterContainer(){
      this.isfootersaved = false
                   axios
                     .put(this.baseUrl + '/footers/' + this.containerId,{
                       content: this.footercontent
                     })
                     .then(response => {
                       // Handle success.
                       //console.log('Well done, here is the list of posts: ', response.data);
                       var newTerm = response.data
                       this.isfootersaved = true
                       //this.glossary.unshift(newTerm)
                                  //window.location.reload(true)
                     })
                     .catch(error => {
                       // Handle error.
                       console.log('An error occurred:', error);
                     });
    },
    editContainer(){

     this.iscontainsersaved = false
                  axios
                    .put(this.baseUrl + '/joinuses/' + this.containerId,{
                      title: this.title,
                      subtitle: this.subtitle,
                      linkto: this.linkto,
                      content: this.content,
                      linktext: this.linktext
                    })
                    .then(response => {
                      // Handle success.
                      //console.log('Well done, here is the list of posts: ', response.data);
                      var newTerm = response.data
                      this.iscontainsersaved = true
                      //this.glossary.unshift(newTerm)
                                 //window.location.reload(true)
                    })
                    .catch(error => {
                      // Handle error.
                      console.log('An error occurred:', error);
                    });
    }
  }
}
</script>

<style lang="css">
</style>
